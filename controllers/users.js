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
      res.cookie(common.tokenString, token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000 * 24 * 7,
      }).status(200).json({ token });
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
        id: user._id, name: user.name, email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === errorNameConstants.castErrorName
        || err.name === errorNameConstants.validationErrorName) {
        throw new BadRequest(err.message);
      }
      if ((err.name === errorNameConstants.mongoErrorName
        || err.name === errorNameConstants.mongoServerErrorName) && err.code === 11000) {
        throw new Conflict(`Пользователь с email ${email} уже существует`);
      }
      throw err;
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(new NotFound(`${errorNameConstants.userNotFoundErrorName} ${req.user._id}`));
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === errorNameConstants.castErrorName) {
        throw new BadRequest(err.message);
      }
      throw err;
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    { _id: userId },
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      next(new NotFound(`${errorNameConstants.userNotFoundErrorName} ${userId}`));
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === errorNameConstants.castErrorName
        || err.name === errorNameConstants.validationErrorName) {
        throw new BadRequest(err.message);
      }
      if ((err.name === errorNameConstants.mongoErrorName
        || err.name === errorNameConstants.mongoServerErrorName) && err.code === 11000) {
        throw new Conflict(`Невозможно сменить email. Другой пользователь с email ${email} уже существует`);
      }
      throw err;
    })
    .catch(next);
};

export {
  login,
  createUser,
  updateUserInfo,
  getUserInfo,
};
