import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { DefaultResponseDto } from "../dto/default-response.dto";

export interface ExceptionResponseObject {
  statusCode: Number;
  error: string;
  message: string | string[]
}

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GeneralExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>()

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as string | ExceptionResponseObject;
      const statusCode = exception.getStatus();

      let message: string;

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      }
      else if (Array.isArray(exceptionResponse.message)) {
        message = exceptionResponse.message[0];
      }
      else {
        message = exceptionResponse.message;
      }

      this.logger.error(
        {
          stack: exception instanceof HttpException ? exception.stack : undefined,
          error: message,
          method: request.method,
          url: request.url,
          statusCode
        },
        `Erro na requisicao HTTP  `,
      )

      return response.status(statusCode).json(new DefaultResponseDto(statusCode, false, null, message));
    }

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(
      {
        stack: exception instanceof Error ? exception.stack : undefined,
        error: exception,
        method: request.method,
        url: request.url,
        statusCode,
      },
      'Erro desconhecido'
    );

    return response.status(statusCode).json(new DefaultResponseDto(statusCode, false, null, 'Erro Interno no Servidor'))
  }
}
