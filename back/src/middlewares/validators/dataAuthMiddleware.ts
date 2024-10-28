export const dataAuthValidator = (req: any, res: any, next: any) => {
  const { id } = req.body;

  if (!id) {
    const error = new Error("El id es obligatorio");
    return next(error);
  }

  next();
};
