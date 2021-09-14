import { errorHandlerConstants } from '../utils/constants.js';

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errorHandlerConstants.errorMessageDefault
        : message,
    });
};

export default errorHandler;
