// src/utils/customErrors.ts

class HttpException extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

class MethodNotAllowedException extends HttpException {
  constructor(message = "Method Not Allowed") {
    super(405, message);
  }
}

class ConflictException extends HttpException {
  constructor(message = "Conflict") {
    super(409, message);
  }
}

class UnprocessableEntityException extends HttpException {
  constructor(message = "Unprocessable Entity") {
    super(422, message);
  }
}

class InternalServerErrorException extends HttpException {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}

class ServiceUnavailableException extends HttpException {
  constructor(message = "Service Unavailable") {
    super(503, message);
  }
}

export {
  HttpException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  MethodNotAllowedException,
  ConflictException,
  UnprocessableEntityException,
  InternalServerErrorException,
  ServiceUnavailableException,
};
