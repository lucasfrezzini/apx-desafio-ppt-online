import { ValidationError } from "../../utils/customErrors";

export const dataGetUserValidator = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ValidationError("El id es obligatorio");
    }
    // Continuar con la lógica del controlador
    next();
  } catch (error: any) {
    next(error);
  }
};
