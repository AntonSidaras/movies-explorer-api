import cors from 'cors';
import { corsPolicyConstants } from '../utils/constants.js';

const allowedOrigins = [
  'http://movies.asidaras.ru',
  'https://movies.asidaras.ru',
  'http://asidaras.ru',
  'https://asidaras.ru',
];

const corsPolicy = cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error(corsPolicyConstants.message), false);
    }
    return callback(null, true);
  },
});

export default corsPolicy;
