#!/usr/bin/env bash
# End-to-end tests for the RingDesk Cal.com booking integration.
#
# Usage:
#   ./scripts/test-cal-endpoints.sh
#   BASE_URL=http://localhost:3000 ./scripts/test-cal-endpoints.sh
#
# Requires: curl, jq.
#
# Set BASE_URL to your deployment (defaults to production). Set DRY_RUN=1 to
# print everything but skip the booking writes if you don't want to clutter
# Tony's calendar.

set -uo pipefail

BASE_URL="${BASE_URL:-https://ringdesk.co}"
DRY_RUN="${DRY_RUN:-0}"

# Dummy attendee data — change if you don't want these in your booking notifications.
TEST_NAME="${TEST_NAME:-RingDesk Test Caller}"
TEST_EMAIL="${TEST_EMAIL:-tony+caltest@ringdesk.co}"
TEST_PHONE="${TEST_PHONE:-+19705558725}"
TEST_BUSINESS="${TEST_BUSINESS:-RingDesk Test Plumbing}"
TEST_REASON="${TEST_REASON:-Automated test from scripts/test-cal-endpoints.sh}"

PASS=0
FAIL=0

color_green() { printf '\033[32m%s\033[0m' "$1"; }
color_red() { printf '\033[31m%s\033[0m' "$1"; }
color_dim() { printf '\033[2m%s\033[0m' "$1"; }

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "ERROR: $1 is required but not installed." >&2
    exit 2
  fi
}
require_cmd curl
require_cmd jq

assert() {
  local name="$1"
  local cond="$2"
  if [[ "$cond" == "true" ]]; then
    echo "  $(color_green "PASS") $name"
    PASS=$((PASS + 1))
  else
    echo "  $(color_red "FAIL") $name"
    FAIL=$((FAIL + 1))
  fi
}

print_curl() {
  echo "  $(color_dim "$ $1")"
}

echo "=== RingDesk Cal.com integration tests ==="
echo "Target: $BASE_URL"
[[ "$DRY_RUN" == "1" ]] && echo "(DRY_RUN=1 — booking calls will be skipped)"
echo

############################################
# Test 1 — fetch availability
############################################
echo "Test 1: GET availability"
CURL_CMD="curl -s -X POST $BASE_URL/api/cal/availability -H 'Content-Type: application/json' -d '{\"daysAhead\":7}'"
print_curl "$CURL_CMD"
AVAIL_RES=$(curl -s -X POST "$BASE_URL/api/cal/availability" \
  -H "Content-Type: application/json" \
  -d '{"daysAhead":7}')
echo "$AVAIL_RES" | jq '{success, errorCode, count: (.slots // []) | length, first: (.slots // [])[0]}' 2>/dev/null || {
  echo "$AVAIL_RES"
  echo "  $(color_red "FAIL") response was not valid JSON"
  FAIL=$((FAIL + 1))
  exit 1
}

SUCCESS=$(echo "$AVAIL_RES" | jq -r '.success')
SLOT_COUNT=$(echo "$AVAIL_RES" | jq -r '(.slots // []) | length')
FIRST_ISO=$(echo "$AVAIL_RES" | jq -r '(.slots // [])[0].iso // empty')

assert "response.success is true" "$([[ "$SUCCESS" == "true" ]] && echo true || echo false)"
assert "slots is a non-empty array" "$([[ "$SLOT_COUNT" -gt 0 ]] && echo true || echo false)"
assert "first slot has iso, spoken, date, time" "$(echo "$AVAIL_RES" | jq -e '(.slots // [])[0] | has("iso") and has("spoken") and has("date") and has("time")' >/dev/null && echo true || echo false)"

if [[ -z "$FIRST_ISO" ]]; then
  echo "  $(color_red "FAIL") no slots returned — cannot run booking tests"
  echo
  echo "Result: $PASS passed, $FAIL failed"
  exit 1
fi

echo

############################################
# Test 2 — book the first slot
############################################
echo "Test 2: POST book — first slot, full attendee data"
BOOK_BODY=$(jq -n \
  --arg iso "$FIRST_ISO" \
  --arg name "$TEST_NAME" \
  --arg email "$TEST_EMAIL" \
  --arg phone "$TEST_PHONE" \
  --arg biz "$TEST_BUSINESS" \
  --arg reason "$TEST_REASON" \
  '{startTimeIso:$iso, name:$name, email:$email, phone:$phone, businessName:$biz, reason:$reason}')
CURL_CMD="curl -s -X POST $BASE_URL/api/cal/book -H 'Content-Type: application/json' -d '$BOOK_BODY'"
print_curl "$CURL_CMD"

if [[ "$DRY_RUN" == "1" ]]; then
  echo "  $(color_dim "(skipped — DRY_RUN=1)")"
  BOOK_RES=""
else
  BOOK_RES=$(curl -s -X POST "$BASE_URL/api/cal/book" \
    -H "Content-Type: application/json" \
    -d "$BOOK_BODY")
  echo "$BOOK_RES" | jq '{success, errorCode, bookingUid, confirmedTimeSpoken, message}' 2>/dev/null || echo "$BOOK_RES"
  BOOK_OK=$(echo "$BOOK_RES" | jq -r '.success')
  BOOK_UID=$(echo "$BOOK_RES" | jq -r '.bookingUid // empty')
  assert "booking succeeded" "$([[ "$BOOK_OK" == "true" ]] && echo true || echo false)"
  assert "bookingUid is populated" "$([[ -n "$BOOK_UID" ]] && echo true || echo false)"
fi
echo

############################################
# Test 3 — same slot again should fail with SLOT_TAKEN
############################################
echo "Test 3: POST book — re-book the same slot (expect SLOT_TAKEN)"
print_curl "$CURL_CMD"
if [[ "$DRY_RUN" == "1" ]]; then
  echo "  $(color_dim "(skipped — DRY_RUN=1)")"
else
  DUP_RES=$(curl -s -X POST "$BASE_URL/api/cal/book" \
    -H "Content-Type: application/json" \
    -d "$BOOK_BODY")
  echo "$DUP_RES" | jq '{success, errorCode, message}' 2>/dev/null || echo "$DUP_RES"
  DUP_OK=$(echo "$DUP_RES" | jq -r '.success')
  DUP_CODE=$(echo "$DUP_RES" | jq -r '.errorCode // empty')
  assert "second booking returned success=false" "$([[ "$DUP_OK" == "false" ]] && echo true || echo false)"
  assert "errorCode is SLOT_TAKEN" "$([[ "$DUP_CODE" == "SLOT_TAKEN" ]] && echo true || echo false)"
fi
echo

############################################
# Test 4 — null email, fresh slot, verify synthesized email path
############################################
echo "Test 4: POST book — email=null on a fresh slot (expect success via synth-email)"
SECOND_ISO=$(echo "$AVAIL_RES" | jq -r '(.slots // [])[1].iso // empty')
if [[ -z "$SECOND_ISO" ]]; then
  echo "  $(color_dim "(skipped — only one slot was available so we can't try a second)")"
else
  NULLMAIL_BODY=$(jq -n \
    --arg iso "$SECOND_ISO" \
    --arg name "$TEST_NAME (null-email test)" \
    --arg phone "$TEST_PHONE" \
    --arg biz "$TEST_BUSINESS" \
    --arg reason "Null-email synth-email test" \
    '{startTimeIso:$iso, name:$name, email:null, phone:$phone, businessName:$biz, reason:$reason}')
  CURL_CMD="curl -s -X POST $BASE_URL/api/cal/book -H 'Content-Type: application/json' -d '$NULLMAIL_BODY'"
  print_curl "$CURL_CMD"
  if [[ "$DRY_RUN" == "1" ]]; then
    echo "  $(color_dim "(skipped — DRY_RUN=1)")"
  else
    NULLMAIL_RES=$(curl -s -X POST "$BASE_URL/api/cal/book" \
      -H "Content-Type: application/json" \
      -d "$NULLMAIL_BODY")
    echo "$NULLMAIL_RES" | jq '{success, errorCode, bookingUid, confirmedTimeSpoken, message}' 2>/dev/null || echo "$NULLMAIL_RES"
    NULL_OK=$(echo "$NULLMAIL_RES" | jq -r '.success')
    assert "null-email booking succeeded" "$([[ "$NULL_OK" == "true" ]] && echo true || echo false)"
  fi
fi
echo

echo "=== Result: $PASS passed, $FAIL failed ==="
[[ "$FAIL" -eq 0 ]] || exit 1
