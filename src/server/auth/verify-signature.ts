import nacl from "tweetnacl";
import bs58 from "bs58";

const MESSAGE_REGEX =
  /^Sign in to MediChat Assistant\n\nTimestamp: (\d+)\nNonce: ([a-f0-9]+)$/;
const MAX_AGE_SECONDS = 5 * 60; // 5 minutes

/**
 * Verifies a Solana Ed25519 signature for auth.
 * Returns the wallet address if valid, null otherwise.
 */
export function verifySolanaAuthSignature(
  walletAddress: string,
  message: string,
  signatureBase64: string
): string | null {
  try {
    // Parse and validate message format
    const match = message.match(MESSAGE_REGEX);
    if (!match) return null;

    const [, timestampStr, nonce] = match;
    const timestamp = parseInt(timestampStr ?? "0", 10);
    const now = Math.floor(Date.now() / 1000);
    if (now - timestamp > MAX_AGE_SECONDS || timestamp > now + 60) {
      return null; // Expired or future-dated
    }

    // Decode public key from Solana address (base58)
    const publicKey = bs58.decode(walletAddress);
    if (publicKey.length !== 32) return null;

    // Decode signature (base64)
    const signature = Buffer.from(signatureBase64, "base64");
    if (signature.length !== 64) return null;

    // Message must be signed exactly as received (UTF-8)
    const messageBytes = new TextEncoder().encode(message);

    const isValid = nacl.sign.detached.verify(
      messageBytes,
      new Uint8Array(signature),
      new Uint8Array(publicKey)
    );

    return isValid ? walletAddress : null;
  } catch {
    return null;
  }
}
