export const errorMiddleware = (err: any, req: any, res: any, next: any) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Error interno del servidor";
  const type = err.name || "ServerError";

  res.status(statusCode).json({
    success: false,
    statusCode,
    error: {
      message,
      type,
    },
  });
};
