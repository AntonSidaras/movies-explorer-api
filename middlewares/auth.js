import jwt from 'jsonwebtoken';
import Unauthorized from '../utils/unauthorized-error.js';
import { common, authConstants } from '../utils/constants.js';
import { serviceLogger } from '../utils/logger.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res, next) => {
  next(new Unauthorized(authConstants.authRequired));
};

const extractBearerToken = (header) => header.replace(authConstants.bearerStr, '');

const auth = (req, res, next) => {
  let hasAuthCookie = false;
  let hasAuthHeader = false;

  const { authorization } = req.headers;
  const cookieToken = req.cookies.auth_token;
  let token = '';

  if (cookieToken) {
    hasAuthCookie = true;
    token = cookieToken;
  }

  if (authorization) {
    if (authorization.startsWith(authConstants.bearerStr)) {
      hasAuthHeader = true;
      token = extractBearerToken(authorization);
    }
  }

  if (!(hasAuthCookie || hasAuthHeader)) {
    return handleAuthError(res, next);
  }

  let payload;

  if (NODE_ENV === common.productionMode) {
    try {
      payload = jwt.verify(token, common.secretDev);
      serviceLogger.info(authConstants.sameKeyWarning);
    } catch (err) {
      if (err.name === authConstants.jwtError && err.message === authConstants.jwtErrorMessage) {
        serviceLogger.info(authConstants.okMessage);
      } else {
        serviceLogger.info(authConstants.errMessage + err);
      }
    }
  }

  try {
    payload = jwt.verify(token,
      NODE_ENV === common.productionMode ? JWT_SECRET : common.secretDev);
  } catch (err) {
    return handleAuthError(res, next);
  }

  req.user = payload;

  return next();
};

export default auth;
