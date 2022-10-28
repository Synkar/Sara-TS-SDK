import { AxiosError } from "axios";

export class NotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundException";
  }
}

export class BadRequestException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestException";
  }
}

export class UnauthorizedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedException";
  }
}

export class ForbiddenException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenException";
  }
}

export class InternalServerErrorException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerErrorException";
  }
}

export class UnknownErrorException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnknowException";
  }
}

/**
 * This is a helper class to handle exceptions from Sara API.
 *
 * @param data - Is the error object from the api (normally has detail or error as key).
 */
export class SaraExceptions {
  data: any;

  constructor(data: any) {
    this.data = data;
  }
}

/**
 * A generic method to handle exceptions from Sara API.
 * @param error - Is the AxiosError created by the request to the Sara API.
 *
 * @throws NotFoundException
 * @throws BadRequestException
 * @throws UnauthorizedException
 * @throws ForbiddenException
 * @throws InternalServerErrorException
 * @throws UnknownErrorException
 *
 */
export const handleExceptions = (error: AxiosError) => {
  console.log(error);
  const saraException: SaraExceptions = new SaraExceptions(error.response.data);
  const msg = saraException.data.detail
    ? saraException.data.detail
    : saraException.data.error
    ? saraException.data.error
    : "no detail";
  if (error.response.status === 404) {
    throw new NotFoundException(msg);
  } else if (error.response.status === 401) {
    throw new UnauthorizedException(msg);
  } else if (error.response.status === 403) {
    throw new ForbiddenException(msg);
  } else if (error.response.status === 400) {
    throw new BadRequestException(msg);
  } else if (error.response.status === 500) {
    throw new UnknownErrorException(msg);
  } else {
    throw new UnknownErrorException(msg);
  }
};
