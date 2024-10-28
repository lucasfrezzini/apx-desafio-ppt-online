export const errorMiddleware = (err: any, req: any, res: any, next: any) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Error interno del servidor";

  // Responder con el error en formato JSON
  res.status(statusCode).json({
    success: false,
    message,
  });
};
