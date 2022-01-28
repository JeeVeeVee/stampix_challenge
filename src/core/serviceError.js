const NOT_FOUND = 'NOT_FOUND';
const VALIDATION_FAILED = 'VALIDATION_FAILED';
const UNAUTHORIZED = 'UNAUTHORIZED';
const FORBIDDEN = 'FORBIDDEN';

/**
 * class used to show the user of the api to show what the error was that occured
 * @param code      geeft aan welke code de error heeft
 * @param message   bericht dat de user ziet, moet meer info geven over waar of waarom het fout ging
 * @param details   extra details over de fout
 */
class ServiceError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'ServiceError';
  }

  static notFound(message, details) {
    return new ServiceError(NOT_FOUND, message, details);
  }

  static validationFailed(message, details) {
    return new ServiceError(VALIDATION_FAILED, message, details);
  }

  static unauthorized(message, details) {
    return new ServiceError(UNAUTHORIZED, message, details);
  }

  static forbidden(message, details) {
    return new ServiceError(FORBIDDEN, message, details);
  }

  get isNotFound() {
    return this.code === NOT_FOUND;
  }

  get isValidationFailed() {
    return this.code === VALIDATION_FAILED;
  }

  get isUnauthorized() {
    return this.code === UNAUTHORIZED;
  }

  get isForbidden() {
    return this.code === FORBIDDEN;
  }
}

export const serviceError = ServiceError;
