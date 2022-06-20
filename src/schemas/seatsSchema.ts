import Joi from 'joi';

export const getSeatsSchema = Joi.object({
  activityId: Joi.number().required().min(0),
  locationId: Joi.number().required().min(0),
});
