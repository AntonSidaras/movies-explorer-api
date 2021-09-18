import { celebrate, Joi, Segments } from 'celebrate';
import validator from 'validator';

const customIsURL = (value, helpers) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    return helpers.error('any.invalid');
  }
  return value;
};

const createMovieSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(customIsURL, 'custom validation').required(),
    trailer: Joi.string().custom(customIsURL, 'custom validation').required(),
    thumbnail: Joi.string().custom(customIsURL, 'custom validation').required(),
    movieId: Joi.string().hex().length(24).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object().keys({
    'content-type': Joi.string().pattern(/^application\/json$/i).required(),
  }).unknown(true),
});

const deleteMovieSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

export {
  createMovieSchema,
  deleteMovieSchema,
};
