import { NextResponse } from "next/server";

import { bookSlot } from "@/lib/cal";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

type BookRequestBody = {
  startTimeIso?: string;
  name?: string;
  email?: string | null;
  phone?: string;
  businessName?: string;
  reason?: string;
};

// Same defensive unwrap as the availability route — accept either the
// direct shape (matches the spec/test script) or Vapi's tool-calls envelope.
function unwrapToolArgs(raw: unknown): BookRequestBody {
  if (raw && typeof raw === "object") {
    const direct = raw as BookRequestBody;
    if (typeof direct.startTimeIso === "string") return direct;
    const envelope = raw as {
      message?: {
        toolCalls?: { function?: { arguments?: BookRequestBody | string } }[];
      };
    };
    const args = envelope.message?.toolCalls?.[0]?.function?.arguments;
    if (typeof args === "string") {
      try {
        return JSON.parse(args) as BookRequestBody;
      } catch {
        return {};
      }
    }
    if (args && typeof args === "object") return args;
    return direct;
  }
  return {};
}

function maskPhone(phone: string | undefined): string {
  if (!phone) return "<missing>";
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) return `***${digits}`;
  return `***-${digits.slice(-4)}`;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  let body: BookRequestBody = {};
  try {
    const text = await req.text();
    body = text ? unwrapToolArgs(JSON.parse(text)) : {};
  } catch {
    return NextResponse.json(
      {
        success: false,
        errorCode: "INVALID_INPUT",
        message: "Request body must be valid JSON.",
      },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const missing: string[] = [];
  if (!body.startTimeIso) missing.push("startTimeIso");
  if (!body.name) missing.push("name");
  if (!body.phone) missing.push("phone");
  if (!body.businessName) missing.push("businessName");

  console.log("[api/cal/book] request", {
    startTimeIso: body.startTimeIso,
    name: body.name ? "<provided>" : "<missing>",
    phone: maskPhone(body.phone),
    businessName: body.businessName ? "<provided>" : "<missing>",
    hasEmail: body.email != null && body.email !== "",
    hasReason: typeof body.reason === "string" && body.reason.length > 0,
  });

  if (missing.length > 0) {
    return NextResponse.json(
      {
        success: false,
        errorCode: "INVALID_INPUT",
        message: `Missing required field(s): ${missing.join(", ")}`,
      },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  try {
    const result = await bookSlot({
      startTimeIso: body.startTimeIso!,
      name: body.name!,
      email: body.email ?? null,
      phone: body.phone!,
      businessName: body.businessName!,
      reason: body.reason,
    });

    if (!result.success) {
      const status =
        result.errorCode === "SLOT_TAKEN"
          ? 409
          : result.errorCode === "INVALID_INPUT"
            ? 400
            : result.errorCode === "API_ERROR"
              ? 502
              : 500;
      console.warn("[api/cal/book] failure", {
        code: result.errorCode,
        message: result.errorMessage,
      });
      return NextResponse.json(
        {
          success: false,
          errorCode: result.errorCode,
          message: result.errorMessage,
        },
        { status, headers: CORS_HEADERS },
      );
    }

    console.log("[api/cal/book] success", {
      bookingUid: result.bookingUid,
      confirmedTimeSpoken: result.confirmedTimeSpoken,
    });
    return NextResponse.json(
      {
        success: true,
        bookingUid: result.bookingUid,
        confirmedTimeSpoken: result.confirmedTimeSpoken,
        message: `Booking confirmed for ${result.confirmedTimeSpoken}`,
      },
      { status: 200, headers: CORS_HEADERS },
    );
  } catch (err) {
    console.error("[api/cal/book] unhandled", err);
    return NextResponse.json(
      {
        success: false,
        errorCode: "API_ERROR",
        message: err instanceof Error ? err.message : "Unknown booking error.",
      },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
