import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { userModelConstants, common } from '../utils/constants.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} ${common.isNotA} ${common.emailString}`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  return this.findOne({ email }).select(userModelConstants.selectPasswordField)
    .then(async (user) => {
      if (!user) {
        return Promise.reject(new Error(userModelConstants.wrongUserNameOrPassword));
      }

      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        return Promise.reject(new Error(userModelConstants.wrongUserNameOrPassword));
      }
      return user;
    });
};

export default mongoose.model(userModelConstants.modelName, userSchema);
