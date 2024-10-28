type Token = {
  id: string;
  time: number;
};

// Random string for rooms
export function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create token with time expiration
export function createToken(timeInMinutes: number): Token {
  return {
    id: generateRandomString(10),
    time: Date.now() + timeInMinutes * 60 * 1000,
  };
}

// Verify token expiration
export function verifyExpiration(time: number): boolean {
  return time < Date.now();
}
