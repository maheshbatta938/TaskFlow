const { verifyToken } = require('../utils/jwt.util');
const ApiError = require('../utils/ApiError');
const { HTTP_STATUS } = require('../constants/http.constants');

// Reads the Bearer token, verifies it, and attaches the identified user to
// req.user so every downstream controller/service can trust req.user.id
// without re-implementing token verification.
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication token is missing'));
  }

  const token = header.split(' ')[1];

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.id, email: payload.email };
    return next();
  } catch (err) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired token'));
  }
}

module.exports = authMiddleware;
