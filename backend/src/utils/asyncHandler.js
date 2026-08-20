// Wraps async route handlers so rejected promises reach the centralized
// error middleware instead of requiring try/catch in every controller.
function asyncHandler(handler) {
  return function wrappedHandler(req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
