import { AuthError, ValidationError } from "../../utils/customErrors";

export const dataNewRoomValidator = (req: any, res: any, next: any) => {
  const { id } = req.body;

  if (!id) {
    return next(new ValidationError("El id es obligatorio"));
  }

  next();
};
