import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  AlreadyExistError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from 'src/errors/errors';

@Catch()
export class GlobalErrorMiddleware implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();
    let statusCode: number;
    let message: string | object;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const responseBody = exception.getResponse();
      message =
        typeof responseBody === 'string'
          ? responseBody
          : (responseBody as any).message || responseBody;
    } else if (
      exception instanceof BadRequestError ||
      exception instanceof NotFoundError ||
      exception instanceof UnauthenticatedError ||
      exception instanceof AlreadyExistError
    ) {
      statusCode = exception.status;
      message = exception.message;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    response.status(statusCode).json({
      statusCode,
      message,
      path: request.url,
    });
  }
}
