import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  public message: string;
  private statusCode: number;
  private labels: Map<string, object> = new Map();

  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
  public addLabel(key: string, value: object): ApiException {
    this.labels.set(key, value);
    return this;
  }

  public getStatus(): number {
    return this.statusCode;
  }

  public static notFound(message: string): ApiException {
    return new ApiException(message, HttpStatus.NOT_FOUND);
  }

  public static badRequest(message: string): ApiException {
    return new ApiException(message, HttpStatus.BAD_REQUEST);
  }

  public static unauthorized(message: string): ApiException {
    return new ApiException(message, HttpStatus.UNAUTHORIZED);
  }

  public static forbidden(message: string): ApiException {
    return new ApiException(message, HttpStatus.FORBIDDEN);
  }

  public static conflict(message: string): ApiException {
    return new ApiException(message, HttpStatus.CONFLICT);
  }

  public static internalError(message: string): ApiException {
    return new ApiException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  public getMessage(): string {
    if (this.labels.size === 0) {
      return this.message;
    }
    return `${this.message} ${JSON.stringify(Object.fromEntries(this.labels))}`;
  }
}

// Path: src/exception/ApiException.ts
