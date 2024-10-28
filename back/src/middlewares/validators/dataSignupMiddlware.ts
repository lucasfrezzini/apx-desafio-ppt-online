export const dataSignupValidator = (req: any, res: any, next: any) => {
  const { name, username } = req.body;

  if (!name || !username) {
    return next(new Error("El nombre y el usuario son obligatorios"));
  }

  next();
};
