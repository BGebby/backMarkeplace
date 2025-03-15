import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  ConflictException,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Si la excepción ya es un HttpException, la manejamos directamente
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
      return;
    }

    // Manejar error de entrada duplicada en MySQL
    if (exception?.code === "ER_DUP_ENTRY") {
      response.status(409).json({
        statusCode: 409,
        message: "El nombre del producto ya existe",
      });
      return;
    }

    // Si no es un error controlado, devolver 500
    console.error("Error no controlado:", exception);
    response.status(500).json({
      statusCode: 500,
      message: "Error interno del servidor",
    });
  }
}
