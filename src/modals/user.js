import mongoose from 'mongoose';

import { default as bcrypt } from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: async (email) =>
          (await User.where({ email }).countDocuments()) === 0,
        message: ({ value }) => `Email ${value} has already been taken`,
      },
    },
    username: {
      type: String,
      validate: {
        validator: async (username) =>
          (await User.where({ username }).countDocuments()) === 0,
        message: ({ value }) => `username ${value} has already been taken`,
      },
    },
    teamId:{
      type: mongoose.Schema.Types.ObjectId,
      
    } ,
    firstName: String,
    lastName: String,
    password: String,
    image: String,
    jerseyNumber: String,
    shoots: String,
    position: String,
    weight: Number,
    height: Number,
    birthDate: String,
    homeTown: String,
    image: String,
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.matchesPassword = function (password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
