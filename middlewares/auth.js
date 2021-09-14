import jwt from 'jsonwebtoken';
import Unauthorized from '../utils/unauthorized-error.js';
import { common, authConstants } from '../utils/constants.js';
import { serviceLogger } from '../utils/logger.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res, next) => {
  next(new Unauthorized());
};

const extractBearerToken = (header) => header.replace(authConstants.bearerStr, '');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(authConstants.bearerStr)) {
    return handleAuthError(res, next);
  }

  const token = extractBearerToken(authorization);
  let payload;

  if (NODE_ENV === common.productionMode) {
    try {
      payload = jwt.verify(token, authConstants.secretDev);
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
      NODE_ENV === common.productionMode ? JWT_SECRET : authConstants.secretDev);
  } catch (err) {
    return handleAuthError(res, next);
  }

  req.user = payload;

  return next();
};

export default auth;
