import Joi from 'joi';
const TeamSchema = Joi.object({
  teamName: Joi.string()
    .required()
    .max(50)
    .min(4)
    .message('Team name must be between 4 and 50 characters'),
  leagueName: Joi.string(),
  teamLogo: Joi.string().required().messages({
      'string.base':'Team logo is required'
    }),
  attributes: Joi.array().required()
    .items(
      Joi.string().valid(
        'jerseyNumber',
        'position',
        'shoots',
        'weight',
        'height',
        'birthDate',
        'homeTown',
        'profile'
      )
    )
    .messages({
        'array.items': 'Invalid attribute',
    }),
});
export default TeamSchema;
