import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Unauthorized from '../utils/unauthorized-error.js';
import BadRequest from '../utils/bad-request-error.js';
import NotFound from '../utils/not-found-error.js';
import Conflict from '../utils/conflict-error.js';
import { common, errorNameConstants } from '../utils/constants.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === common.productionMode ? JWT_SECRET : common.secretDev,
        { expiresIn: '7d' },
      );
      // res.status(200).send({ token });
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      }).status(200).json({ message: 'Logged in successfully' });
    })
    .catch((err) => {
      throw new Unauthorized(err.message);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({
        data: {
          id: user._id, name: user.name, email: user.email,
        },
      });
    })
    .catch((err) => {
      if (err.name === errorNameConstants.castErrorName
        || err.name === errorNameConstants.validationErrorName) {
        throw new BadRequest(err.message);
      }
      if (err.name === errorNameConstants.mongoErrorName && err.code === 11000) {
        throw new Conflict(`Пользователе с email ${email} уже существует`);
      }
    })
    .catch(next);
};

export {
  login,
  createUser,
};
