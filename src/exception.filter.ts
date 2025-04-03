import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      console.log("ERROR");
      console.log(exception);
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        
        message =
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message || message;
        
        // Ensure single message for validation errors
        if (Array.isArray(message)) {
          message = message[0];
        }
      }
  
      response.status(status).json({
        statusCode: status,
        message,
        error: exception.name || 'Error',
        timestamp: new Date().toISOString(),
      });
    }
  }
  