import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

export const runtime = "nodejs";

const MESSAGE_TEMPLATE = `Sign in to MediChat Assistant

Timestamp: {timestamp}
Nonce: {nonce}`;

/**
 * Returns a fresh auth challenge message for the client to sign.
 * The message includes a timestamp and nonce for replay protection.
 */
export async function GET() {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = randomBytes(16).toString("hex");
  const message = MESSAGE_TEMPLATE.replace("{timestamp}", String(timestamp))
    .replace("{nonce}", nonce);

  return NextResponse.json({ message });
}
