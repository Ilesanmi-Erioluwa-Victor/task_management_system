import { HttpStatus } from '@nestjs/common';

export class BadRequestError extends Error {
  status = HttpStatus.BAD_REQUEST;
  errors: any[];

  constructor(message: string, errors?: any[]) {
    super(message);
    this.name = 'BadRequestError';
    this.errors = errors || [];
  }
}

export class NotFoundError extends Error {
  status = HttpStatus.NOT_FOUND;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class UnauthenticatedError extends Error {
  status = HttpStatus.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
    this.name = 'UnauthenticatedError';
  }
}

export class AlreadyExistError extends Error {
  status = HttpStatus.CONFLICT;

  constructor(message: string) {
    super(message);
    this.name = 'AlreadyExistError';
  }
}
