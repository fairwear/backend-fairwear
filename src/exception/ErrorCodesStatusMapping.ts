import { HttpStatus } from '@nestjs/common';

export type ErrorCodesStatusMapping = {
  [key: string]: number;
};

export const errorCodesStatusMap: ErrorCodesStatusMapping = {
  P2000: HttpStatus.BAD_REQUEST,
  P2002: HttpStatus.CONFLICT,
  P2003: HttpStatus.CONFLICT,
  P2004: HttpStatus.CONFLICT,
  P2006: HttpStatus.BAD_REQUEST,
  P2011: HttpStatus.BAD_REQUEST,
  P2012: HttpStatus.BAD_REQUEST,
  P2013: HttpStatus.BAD_REQUEST,
  P2014: HttpStatus.BAD_REQUEST,
  P2015: HttpStatus.NOT_FOUND,
  P2018: HttpStatus.NOT_FOUND,
  P2020: HttpStatus.NOT_FOUND,
  P2021: HttpStatus.NOT_FOUND,
  P2022: HttpStatus.NOT_FOUND,
  P2024: HttpStatus.GATEWAY_TIMEOUT,
  P2025: HttpStatus.NOT_FOUND,
  P2034: HttpStatus.CONFLICT,
  P5000: HttpStatus.INTERNAL_SERVER_ERROR,
  P5003: HttpStatus.NOT_FOUND,
  P5004: HttpStatus.NOT_IMPLEMENTED,
  P5006: HttpStatus.INTERNAL_SERVER_ERROR,
  P5007: HttpStatus.UNAUTHORIZED,
  P5009: HttpStatus.GATEWAY_TIMEOUT,
  P5010: HttpStatus.SERVICE_UNAVAILABLE,
  P5011: HttpStatus.BAD_GATEWAY,
};

export enum errorCodesStatusMapEnum {
  P2000 = HttpStatus.BAD_REQUEST,
  P2002 = HttpStatus.CONFLICT,
  P2003 = HttpStatus.CONFLICT,
  P2004 = HttpStatus.CONFLICT,
  P2006 = HttpStatus.BAD_REQUEST,
  P2011 = HttpStatus.BAD_REQUEST,
  P2012 = HttpStatus.BAD_REQUEST,
  P2013 = HttpStatus.BAD_REQUEST,
  P2014 = HttpStatus.BAD_REQUEST,
  P2015 = HttpStatus.NOT_FOUND,
  P2018 = HttpStatus.NOT_FOUND,
  P2020 = HttpStatus.NOT_FOUND,
  P2021 = HttpStatus.NOT_FOUND,
  P2022 = HttpStatus.NOT_FOUND,
  P2024 = HttpStatus.GATEWAY_TIMEOUT,
  P2025 = HttpStatus.NOT_FOUND,
  P2034 = HttpStatus.CONFLICT,
  P5000 = HttpStatus.INTERNAL_SERVER_ERROR,
  P5003 = HttpStatus.NOT_FOUND,
  P5004 = HttpStatus.NOT_IMPLEMENTED,
  P5006 = HttpStatus.INTERNAL_SERVER_ERROR,
  P5007 = HttpStatus.UNAUTHORIZED,
  P5009 = HttpStatus.GATEWAY_TIMEOUT,
  P5010 = HttpStatus.SERVICE_UNAVAILABLE,
  P5011 = HttpStatus.BAD_GATEWAY,
}

export default ErrorCodesStatusMapping;
