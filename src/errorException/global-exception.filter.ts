import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    InternalServerErrorException,
  } from "@nestjs/common";
  import { Response } from "express";
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      if (exception instanceof HttpException) {
        const status = exception.getStatus();
        response.status(status).json({
          statusCode: status,
          message: exception.message,
        });
      } else {
        console.error("Error no controlado:", exception);
  
        response.status(500).json({
          statusCode: 500,
          message: "Error interno del servidor",
        });
      }
    }
  }
  