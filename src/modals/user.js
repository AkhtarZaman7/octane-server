import mongoose from 'mongoose';

import { default as bcrypt } from 'bcryptjs';

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
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    jerseyNumber: {
      type: String,
    },
    shoots: {
      type: String,
    },
    position: {
      type: String,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    birthDate: {
      type: String,
    },
    homeTown: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
    },
    position: {
      type: String,
    },
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
// userSchema.pre('findOneAndUpdate', async function () {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
// });

userSchema.methods.matchesPassword = function (password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
