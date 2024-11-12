export function waitForTimeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Verify token expiration
const MAX_EXPIRATION = 15 * 60 * 1000;
export function verifyExpiration(time: number = MAX_EXPIRATION): boolean {
  return time < Date.now();
}
