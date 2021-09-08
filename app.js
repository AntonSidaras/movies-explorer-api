/* eslint-disable import/extensions */
import env from 'dotenv';
import express from 'express';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import connectToMongoDB from './utils/db.js';
import { appConstants } from './utils/constants.js';

env.config();

const { PORT = 3000, ATLAS_USER, ATLAS_SECRET } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB(ATLAS_USER, ATLAS_SECRET);

app.use(requestLogger);
app.use(errorLogger);
app.use(errors());

// eslint-disable-next-line no-unused-vars
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
