import Joi from 'joi';
const AnnouncementSchema = Joi.object({
  description: Joi.string()
    .required()
    .max(151)
    .message('Maximum 151 characters'),
  title: Joi.string()
    .required()
    .messages({ 'string.base': 'Title is required' }),
  teamId: Joi.string().required(),
});
export default AnnouncementSchema;
