import { errorNameConstants } from '../utils/constants.js';

const any = (req, res, next) => {
  next(new Error(errorNameConstants.urlNotFoundName));
};

export default any;
