import { NextResponse } from "next/server";

import { CalError, getAvailableSlots } from "@/lib/cal";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const MAX_DAYS_AHEAD = 14;
const DEFAULT_DAYS_AHEAD = 7;

type AvailabilityRequestBody = {
  daysAhead?: number;
};

// Vapi's function-tool webhook can wrap args in
// { message: { toolCalls: [{ function: { arguments: {...} } }] } }
// depending on the dashboard tool config. Accept either the direct shape
// (matches the spec and the test script) or the Vapi envelope.
function unwrapToolArgs(raw: unknown): AvailabilityRequestBody {
  if (raw && typeof raw === "object") {
    const direct = raw as AvailabilityRequestBody;
    if (typeof direct.daysAhead === "number") return direct;
    const envelope = raw as {
      message?: {
        toolCalls?: { function?: { arguments?: AvailabilityRequestBody | string } }[];
      };
    };
    const args = envelope.message?.toolCalls?.[0]?.function?.arguments;
    if (typeof args === "string") {
      try {
        return JSON.parse(args) as AvailabilityRequestBody;
      } catch {
        return {};
      }
    }
    if (args && typeof args === "object") return args;
    return direct;
  }
  return {};
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  let body: AvailabilityRequestBody = {};
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

  const requested =
    typeof body.daysAhead === "number" ? body.daysAhead : DEFAULT_DAYS_AHEAD;
  const daysAhead = Math.min(MAX_DAYS_AHEAD, Math.max(1, requested));

  console.log("[api/cal/availability] request", { daysAhead });

  try {
    const { slots } = await getAvailableSlots(daysAhead);
    console.log("[api/cal/availability] returning slots", {
      count: slots.length,
    });
    return NextResponse.json(
      { success: true, slots },
      { status: 200, headers: CORS_HEADERS },
    );
  } catch (err) {
    if (err instanceof CalError) {
      const status = err.code === "NO_AVAILABILITY" ? 200 : 502;
      console.warn("[api/cal/availability] CalError", {
        code: err.code,
        message: err.message,
      });
      return NextResponse.json(
        {
          success: false,
          errorCode: err.code,
          message: err.message,
          slots: [],
        },
        { status, headers: CORS_HEADERS },
      );
    }
    console.error("[api/cal/availability] unhandled", err);
    return NextResponse.json(
      {
        success: false,
        errorCode: "API_ERROR",
        message:
          err instanceof Error ? err.message : "Unknown availability error.",
      },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
