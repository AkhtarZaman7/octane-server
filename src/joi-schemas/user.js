import Joi from 'joi';
const UserSchema = Joi.object({
  username: Joi.string()
    .required()
    .max(50)
    .min(3)
    .message('Username must be between 3 and 50 characters'),
  firstName: Joi.string()
    .required()
    .max(50)
    .min(3)
    .message('First name must be between 3 and 50 characters'),
  lastName: Joi.string()
    .required()
    .max(50)
    .min(3)
    .message('Last name must be between 3 and 50 characters'),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{0,32}$/)
    .required()
    .messages({
      'string.base':
        'Password must be at least 8 characters, at least one uppercase letter, one lowercase letter and one number',
      'string.empty': 'Password cannot be empty',
      'string.pattern.base':
        'Password must be at least 8 characters, at least one uppercase letter, one lowercase letter and one number',
    }),
  confirmPassword: Joi.ref('password'),
  role: Joi.string().valid('coach', 'player').required(),
  teamId: Joi.string().required(),
  //   // optional
  jerseyNumber: Joi.string(),
  shoots: Joi.string(),
  position: Joi.string(),
  weight: Joi.number(),
  height: Joi.number(),
  birthDate: Joi.string(),
  homeTown: Joi.string(),
  image: Joi.string(),
});
const updateUserSchema = Joi.object({
  _id: Joi.string().required(),
  username: Joi.string()
    .required()
    .max(50)
    .min(3)
    .message('Username must be between 3 and 50 characters'),
  firstName: Joi.string()
    .required()
    .max(50)
    .min(3)
    .message('First name must be between 3 and 50 characters'),
  lastName: Joi.string()
    .required()
    .max(50)
    .min(3)
    .message('Last name must be between 3 and 50 characters'),
  email: Joi.string().email().required(),

  role: Joi.string().valid('coach', 'player').required(),
  teamId: Joi.string().required(),
  //   // optional
  jerseyNumber: Joi.string(),
  shoots: Joi.string(),
  position: Joi.string(),
  weight: Joi.string(),
  height: Joi.string(),
  birthDate: Joi.string(),
  homeTown: Joi.string(),
  image: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{0,32}$/)
    .required()
    .messages({
      'string.base':
        'Password must be at least 8 characters, at least one uppercase letter, one lowercase letter and one number',
      'string.empty': 'Password cannot be empty',
      'string.pattern.base':
        'Password must be at least 8 characters, at least one uppercase letter, one lowercase letter and one number',
    }),
});

const passwordSchema = Joi.object({
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{0,32}$/)
    .required()
    .messages({
      'string.base':
        'Password must be at least 8 characters, at least one uppercase letter, one lowercase letter and one number',
      'string.empty': 'Password cannot be empty',
      'string.pattern.base':
        'Password must be at least 8 characters, at least one uppercase letter, one lowercase letter and one number',
    }),
});
export { loginSchema, passwordSchema,updateUserSchema };
export default UserSchema;
