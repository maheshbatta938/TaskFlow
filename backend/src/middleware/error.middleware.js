const ApiError = require('../utils/ApiError');
const { sendError } = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../constants/http.constants');
const env = require('../config/env');

function notFoundHandler(req, res, next) {
  next(new ApiError(HTTP_STATUS.NOT_FOUND, `Route not found: ${req.method} ${req.originalUrl}`));
}

// Single place that turns any thrown/rejected error into the API's
// standard error response shape, so controllers never format errors themselves.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = isApiError ? err.message : 'Internal server error';

  if (!isApiError && env.nodeEnv !== 'test') {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return sendError(res, {
    statusCode,
    message,
    error: isApiError && err.details ? err.details : undefined,
  });
}

module.exports = { notFoundHandler, errorHandler };
