import Joi from 'joi';
const ScheduledGamesSchema = Joi.object({
  type: Joi.string().required().max(151).message('Type is required'),
  date: Joi.string().required().messages({ 'string.base': 'Date Required' }),
  time: Joi.string().required().messages({ 'string.base': 'Time Required' }),
  opponent: Joi.string(),
  timeZoneName: Joi.string().required().messages({'string.base': 'TimeZone Required'}),
  timeZoneOffset: Joi.number()
    .required()
    .messages({'string.base': 'offset Required'}),
  location: Joi.string().required().messages({'string.base': 'Location Required'}),
  locationAddress: Joi.string()
    .required()
    .messages({'string.base': 'Location address Required'}),
  teamId: Joi.string().required().messages({'string.base': 'Team Reference Required'}),
});
export default ScheduledGamesSchema;
