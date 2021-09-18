import { celebrate, Joi, Segments } from 'celebrate';

const signInSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object().keys({
    'content-type': Joi.string().pattern(/^application\/json$/i).required(),
  }).unknown(true),
});

const signUpSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const singOutSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({}),
  [Segments.HEADERS]: Joi.object().keys({
    'content-type': Joi.string().pattern(/^application\/json$/i).required(),
  }).unknown(true),
});

export {
  signInSchema,
  signUpSchema,
  singOutSchema,
};
