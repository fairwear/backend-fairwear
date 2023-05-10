import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';

import { MyLogger } from '../logger/logger';
import ErrorCodesStatusMapping, {
  errorCodesStatusMap,
} from './ErrorCodesStatusMapping';

/**
 * {@link PrismaClientExceptionFilter}
 * catches {@link Prisma.PrismaClientKnownRequestError}
 * and {@link Prisma.NotFoundError} exceptions.
 */
@Catch(Prisma.PrismaClientKnownRequestError, Prisma.NotFoundError, Error)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  /**
   * default error codes mapping
   *
   * Error codes definition for Prisma Client (Query Engine)
   * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
   */
  private errorCodesStatusMapping: ErrorCodesStatusMapping =
    errorCodesStatusMap;

  private logger: MyLogger;

  /**
   * @param applicationRef
   * @param errorCodesStatusMapping
   */
  constructor(
    logger: MyLogger,
    applicationRef?: HttpServer,
    errorCodesStatusMapping?: ErrorCodesStatusMapping,
  ) {
    super(applicationRef);

    if (errorCodesStatusMapping) {
      this.errorCodesStatusMapping = Object.assign(
        this.errorCodesStatusMapping,
        errorCodesStatusMapping,
      );
    }
    if (logger) {
      this.logger = logger;
    }
  }

  /**
   * @param exception
   * @param host
   * @returns
   */
  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | PrismaClientUnknownRequestError
      | HttpException
      | any,
    host: ArgumentsHost,
  ) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.catchClientKnownRequestError(exception, host);
    }
    if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      this.logger.error(exception.message, exception.stack || exception.name);
      return super.catch(exception, host);
    }
    if (exception instanceof HttpException) {
      this.logger.error(exception.message, exception.stack || exception.name);
      return super.catch(exception, host);
    }
  }

  private catchClientKnownRequestError(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const statusCode = this.errorCodesStatusMapping[exception.code];
    const message = `[${exception.code}]: ${this.exceptionShortMessage(
      exception.message,
    )}`;

    this.logger.error(message, exception.code);

    if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
      return super.catch(exception, host);
    }

    super.catch(
      new HttpException({ statusCode, message }, statusCode, {
        description: `${exception.meta}`,
        cause: exception,
      }),
      host,
    );
  }

  private exceptionShortMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'));
    this.logger.log(shortMessage);
    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }
}
