import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

const CAL_API_BASE = "https://api.cal.com/v2";
const CAL_TZ = "America/Denver";
const SLOT_API_VERSION = "2024-09-04";
const BOOKING_API_VERSION = "2024-08-13";
const MIN_NOTICE_HOURS = 2;
const MAX_SLOTS_RETURNED = 8;

export type CalErrorCode =
  | "NO_AVAILABILITY"
  | "API_ERROR"
  | "SLOT_TAKEN"
  | "INVALID_INPUT"
  | "UNKNOWN";

export class CalError extends Error {
  readonly code: CalErrorCode;
  constructor(code: CalErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = "CalError";
  }
}

export type SlotOption = {
  iso: string;
  spoken: string;
  date: string;
  time: string;
};

export type BookSlotParams = {
  startTimeIso: string;
  name: string;
  email: string | null;
  phone: string;
  businessName: string;
  reason?: string;
};

export type BookingSuccess = {
  success: true;
  bookingUid: string;
  confirmedTimeSpoken: string;
};

export type BookingFailure = {
  success: false;
  errorCode: CalErrorCode;
  errorMessage: string;
};

export type BookingResult = BookingSuccess | BookingFailure;

type CalSlotEntry = { time: string };
type CalSlotsByDay = Record<string, CalSlotEntry[]>;

// Cal.com v2 returns either { status, data: Record<date, slots[]> } or
// { status, data: { slots: Record<date, slots[]> } } depending on version —
// handle both shapes so a docs-vs-runtime mismatch doesn't break us.
type CalSlotsResponseFlat = {
  status?: string;
  data?: CalSlotsByDay;
};
type CalSlotsResponseNested = {
  status?: string;
  data?: { slots?: CalSlotsByDay };
};
type CalSlotsResponse = CalSlotsResponseFlat | CalSlotsResponseNested;

type CalBookingResponse = {
  status?: string;
  data?: { uid?: string; id?: number | string };
  error?: { message?: string; code?: string } | string;
  message?: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new CalError(
      "API_ERROR",
      `Missing required env var ${name} — set it in Vercel project settings and redeploy.`,
    );
  }
  return value;
}

function calApiKey(): string {
  return requireEnv("CAL_API_KEY");
}

function calUsername(): string {
  return process.env.CAL_USERNAME ?? "ringdesk";
}

function calEventSlug(): string {
  return process.env.CAL_EVENT_SLUG ?? "ai-discovery";
}

function extractSlotsByDay(payload: CalSlotsResponse): CalSlotsByDay {
  if (!payload || typeof payload !== "object" || !payload.data) return {};
  const nested = (payload as CalSlotsResponseNested).data?.slots;
  if (nested && typeof nested === "object") return nested;
  const flat = (payload as CalSlotsResponseFlat).data;
  if (flat && typeof flat === "object") {
    // Heuristic: a flat date-map's values are arrays of {time}.
    const firstKey = Object.keys(flat)[0];
    if (firstKey && Array.isArray((flat as CalSlotsByDay)[firstKey])) {
      return flat as CalSlotsByDay;
    }
  }
  return {};
}

function spokenDateLabel(date: Date): string {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return formatInTimeZone(date, CAL_TZ, "EEEE");
}

function formatSlot(iso: string): SlotOption {
  const date = parseISO(iso);
  const zoned = toZonedTime(date, CAL_TZ);
  const dayLabel = spokenDateLabel(zoned);
  const time = formatInTimeZone(date, CAL_TZ, "h:mm a");
  return {
    iso,
    spoken: `${dayLabel} at ${time} Mountain`,
    date: format(zoned, "EEEE LLLL d"),
    time,
  };
}

function evenlySample(slots: string[], n: number): string[] {
  if (n <= 0 || slots.length === 0) return [];
  if (slots.length <= n) return [...slots];
  const result: string[] = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.min(
      slots.length - 1,
      Math.floor((i * slots.length) / n),
    );
    result.push(slots[idx]);
  }
  // De-dupe in case of rounding collisions.
  return Array.from(new Set(result));
}

function pickSlots(
  slotsByDay: CalSlotsByDay,
  now: Date,
): { iso: string[]; rawSlots: string[] } {
  const cutoff = now.getTime() + MIN_NOTICE_HOURS * 60 * 60 * 1000;
  const sortedDays = Object.keys(slotsByDay).sort();

  const futureByDay: { day: string; slots: string[] }[] = [];
  for (const day of sortedDays) {
    const filtered = (slotsByDay[day] ?? [])
      .map((s) => s.time)
      .filter((t) => parseISO(t).getTime() >= cutoff)
      .sort();
    if (filtered.length > 0) futureByDay.push({ day, slots: filtered });
  }

  const remainingByDay = futureByDay.map((d) => [...d.slots]);
  const picked: string[] = [];

  // Pass 1: take up to 2 evenly-spread slots from each of the first 4 days.
  for (let d = 0; d < remainingByDay.length && picked.length < MAX_SLOTS_RETURNED; d++) {
    const sample = evenlySample(remainingByDay[d], 2);
    for (const slot of sample) {
      if (picked.length >= MAX_SLOTS_RETURNED) break;
      picked.push(slot);
      remainingByDay[d] = remainingByDay[d].filter((s) => s !== slot);
    }
  }

  // Pass 2: backfill from any day that still has slots, in order.
  for (let d = 0; d < remainingByDay.length && picked.length < MAX_SLOTS_RETURNED; d++) {
    while (
      remainingByDay[d].length > 0 &&
      picked.length < MAX_SLOTS_RETURNED
    ) {
      const slot = remainingByDay[d].shift();
      if (slot) picked.push(slot);
    }
  }

  picked.sort();
  const rawSlots = futureByDay.flatMap((d) => d.slots);
  return { iso: picked.slice(0, MAX_SLOTS_RETURNED), rawSlots };
}

export async function getAvailableSlots(
  daysAhead: number = 7,
): Promise<{ slots: SlotOption[]; rawSlots: string[] }> {
  const apiKey = calApiKey();
  const username = calUsername();
  const slug = calEventSlug();

  const now = new Date();
  const start = now.toISOString();
  const end = new Date(
    now.getTime() + daysAhead * 24 * 60 * 60 * 1000,
  ).toISOString();

  const url = new URL(`${CAL_API_BASE}/slots`);
  url.searchParams.set("username", username);
  url.searchParams.set("eventTypeSlug", slug);
  url.searchParams.set("start", start);
  url.searchParams.set("end", end);
  url.searchParams.set("timeZone", CAL_TZ);

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": SLOT_API_VERSION,
        Accept: "application/json",
      },
      cache: "no-store",
    });
  } catch (err) {
    throw new CalError(
      "API_ERROR",
      `Cal.com /slots fetch failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new CalError(
      "API_ERROR",
      `Cal.com /slots returned ${res.status}: ${text.slice(0, 500)}`,
    );
  }

  const payload = (await res.json()) as CalSlotsResponse;
  const slotsByDay = extractSlotsByDay(payload);

  if (!slotsByDay || Object.keys(slotsByDay).length === 0) {
    throw new CalError(
      "NO_AVAILABILITY",
      `No availability returned by Cal.com for the next ${daysAhead} days.`,
    );
  }

  const picked = pickSlots(slotsByDay, now);
  if (picked.iso.length === 0) {
    throw new CalError(
      "NO_AVAILABILITY",
      "Cal.com returned slots but none satisfy the minimum-notice window.",
    );
  }

  return {
    slots: picked.iso.map(formatSlot),
    rawSlots: picked.rawSlots,
  };
}

const NULL_EMAIL_SENTINELS = new Set(["", "no-email-provided", "none"]);

export function resolveEmail(
  email: string | null | undefined,
  phone: string,
): { email: string; synthesized: boolean } {
  const trimmed = (email ?? "").trim().toLowerCase();
  if (email == null || NULL_EMAIL_SENTINELS.has(trimmed)) {
    const digits = phone.replace(/\D/g, "");
    return {
      email: `noemail-${digits}@ringdesk-noemail.local`,
      synthesized: true,
    };
  }
  return { email: email.trim(), synthesized: false };
}

function classifyBookingError(
  status: number,
  body: CalBookingResponse | null,
): { code: CalErrorCode; message: string } {
  const rawMessage =
    (body && typeof body.error === "object" && body.error?.message) ||
    (body && typeof body.error === "string" && body.error) ||
    body?.message ||
    `HTTP ${status}`;
  const lower = rawMessage.toLowerCase();
  const looksLikeConflict =
    status === 409 ||
    lower.includes("conflict") ||
    lower.includes("no longer available") ||
    lower.includes("already booked") ||
    lower.includes("not available") ||
    lower.includes("slot is taken");
  if (looksLikeConflict) {
    return { code: "SLOT_TAKEN", message: rawMessage };
  }
  if (status === 400 || status === 422) {
    return { code: "INVALID_INPUT", message: rawMessage };
  }
  if (status >= 500) {
    return { code: "API_ERROR", message: rawMessage };
  }
  return { code: "UNKNOWN", message: rawMessage };
}

export async function bookSlot(
  params: BookSlotParams,
): Promise<BookingResult> {
  const apiKey = calApiKey();
  const username = calUsername();
  const slug = calEventSlug();

  const { email: resolvedEmail, synthesized } = resolveEmail(
    params.email,
    params.phone,
  );
  if (synthesized) {
    console.log(
      `[cal] synthesized email for ${params.phone.slice(-4)}: ${resolvedEmail}`,
    );
  }

  const body = {
    eventTypeSlug: slug,
    username,
    start: params.startTimeIso,
    attendee: {
      name: params.name,
      email: resolvedEmail,
      timeZone: CAL_TZ,
      phoneNumber: params.phone,
    },
    bookingFieldsResponses: {
      "business-name": params.businessName,
      reason: params.reason ?? "",
    },
  };

  let res: Response;
  try {
    res = await fetch(`${CAL_API_BASE}/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": BOOKING_API_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch (err) {
    return {
      success: false,
      errorCode: "API_ERROR",
      errorMessage: `Cal.com /bookings fetch failed: ${err instanceof Error ? err.message : String(err)}`,
    };
  }

  let parsed: CalBookingResponse | null = null;
  try {
    parsed = (await res.json()) as CalBookingResponse;
  } catch {
    parsed = null;
  }

  if (!res.ok) {
    const { code, message } = classifyBookingError(res.status, parsed);
    return { success: false, errorCode: code, errorMessage: message };
  }

  const uid =
    parsed?.data?.uid ??
    (parsed?.data?.id != null ? String(parsed.data.id) : undefined);
  if (!uid) {
    return {
      success: false,
      errorCode: "UNKNOWN",
      errorMessage:
        "Cal.com responded 2xx but no booking uid was returned in the payload.",
    };
  }

  const confirmedTimeSpoken = formatSlot(params.startTimeIso).spoken;
  return { success: true, bookingUid: uid, confirmedTimeSpoken };
}
