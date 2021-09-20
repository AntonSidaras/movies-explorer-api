import express from 'express';
import { signInSchema, signUpSchema, singOutSchema } from '../schemas/auth.js';
import { login, createUser } from '../controllers/users.js';
import { common } from '../utils/constants.js';

const authRouter = express.Router();

authRouter.post(common.pathSignIn, signInSchema, login);
authRouter.post(common.pathSignUp, signUpSchema, createUser);
authRouter.post(common.pathSignOut, singOutSchema, (req, res) => {
  res.clearCookie(common.tokenString).status(200).json({ message: common.messageLoggedOut });
});

export default authRouter;
