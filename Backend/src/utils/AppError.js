// A small typed error so controllers can `throw` and have errorHandler
// pick a sensible HTTP status instead of always returning 500.
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
