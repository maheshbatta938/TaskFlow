const authService = require('../services/auth.service');
const { sendSuccess } = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../constants/http.constants');
const asyncHandler = require('../utils/asyncHandler');

const signup = asyncHandler(async (req, res) => {
  const result = await authService.signup(req.body);
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.CREATED,
    message: 'Account created successfully',
    data: result,
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: 'Logged in successfully',
    data: result,
  });
});

// JWTs are stateless, so there is no server-side session to destroy. This
// endpoint exists so the client has a well-defined, protected call to make
// when the user logs out; the actual sign-out is discarding the token.
const logout = asyncHandler(async (req, res) => {
  return sendSuccess(res, { statusCode: HTTP_STATUS.OK, message: 'Logged out successfully' });
});

module.exports = { signup, login, logout };
