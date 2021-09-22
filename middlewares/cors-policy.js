import cors from 'cors';
import { corsPolicyConstants } from '../utils/constants.js';

const allowedOrigins = [
  'http://localhost:3000',
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
