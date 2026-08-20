const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');
const { HTTP_STATUS } = require('../constants/http.constants');

// Runs after an express-validator chain. Collects all field errors into one
// consistent 400 response instead of each route reading validationResult itself.
function validate(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const details = errors.array().map((err) => ({ field: err.path, message: err.msg }));
  return next(new ApiError(HTTP_STATUS.BAD_REQUEST, 'Validation failed', details));
}

module.exports = validate;
