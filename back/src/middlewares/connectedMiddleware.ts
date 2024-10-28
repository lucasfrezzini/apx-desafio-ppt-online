export const connectedMiddleware = (req: any, res: any, next: any) => {
  const MAX_EXPIRATION = 60;
  // verificar que el usuario este autenticado

  // verificar que el tiempo sea menor al tiempo de expiración

  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  next();
};
