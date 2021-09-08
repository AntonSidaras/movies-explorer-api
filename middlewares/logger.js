import winston from 'winston';
import expressWinston from 'express-winston';

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
  format: winston.format.json(),
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
  format: winston.format.json(),
});

export {
  requestLogger,
  errorLogger,
  logger,
};
