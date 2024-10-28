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
const MAX_EXPIRATION = 15 * 60 * 1000;
export function verifyExpiration(time: number = MAX_EXPIRATION): boolean {
  return time < Date.now();
}

export function whoWins(owner: string, guest: string) {
  //? 0 empate, 1 owner, 2 guest
  let win: number;
  if (owner === guest) {
    win = 0;
  } else if (
    (owner === "piedra" && guest === "tijera") ||
    (owner === "papel" && guest === "piedra") ||
    (owner === "tijera" && guest === "papel")
  ) {
    win = 1;
  } else {
    win = 2;
  }
  return win;
}
