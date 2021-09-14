import express from 'express';
import { signInSchema, signUpSchema } from '../schemas/auth.js';
import { login, createUser } from '../controllers/users.js';
import { common } from '../utils/constants.js';

const authRouter = express.Router();

authRouter.post(common.pathSignIn, signInSchema, login);
authRouter.post(common.pathSignUp, signUpSchema, createUser);
authRouter.post(common.pathSignOut, (req, res, next) => {
  res.clearCookie('access_token').status(200).json({ message: 'Successfully logged out' });
});

export default authRouter;
