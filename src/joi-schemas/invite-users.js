import Joi from 'joi';
const InviteUserSchema = Joi.object({
  firstName: Joi.string().required().max(151).message('First Name is required'),
  lastName: Joi.string()
    .required()
    .messages({ 'string.base': 'last Name Required' }),
  email: Joi.string().required().messages({ 'string.base': 'email Required' }),
  teamId: Joi.string()
    .required()
    .messages({ 'string.base': 'Team Id Required' }),
  token: Joi.string().required().messages({ 'string.base': 'Token Required' }),
});
export default InviteUserSchema;
