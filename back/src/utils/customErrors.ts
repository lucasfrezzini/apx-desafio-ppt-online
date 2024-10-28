export class NotFoundError extends Error {
  statusCode: number;
  constructor(message = "Recurso no encontrado") {
    super(message);
    this.statusCode = 404;
  }
}

export class ValidationError extends Error {
  statusCode: number;
  constructor(message = "Datos no válidos") {
    super(message);
    this.statusCode = 400;
  }
}

export class AuthError extends Error {
  statusCode: number;
  constructor(message = "No autorizado") {
    super(message);
    this.statusCode = 401;
  }
}
