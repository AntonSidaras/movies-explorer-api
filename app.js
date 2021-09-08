import env from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import corsPolicy from './middlewares/cors-policy.js';
import connectToMongoDB from './utils/db.js';
import { appConstants } from './utils/constants.js';

env.config();

const {
  PORT = 3000,
  ATLAS_USER = appConstants.atlasFakeUser,
  ATLAS_SECRET = appConstants.atlasFakePassword,
} = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB(ATLAS_USER, ATLAS_SECRET);

app.use(requestLogger);

app.use(limiter);
app.use(corsPolicy);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? appConstants.errorMessageDefault
        : message,
    });
});

app.listen(PORT, () => {});
