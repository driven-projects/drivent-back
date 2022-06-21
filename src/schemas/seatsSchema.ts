import Joi from 'joi';

export const getSeatsSchema = Joi.object({
  activityId: Joi.number().required().min(0),
  locationId: Joi.number().required().min(0),
});
export const getSeatsByEnrollmentIdSchema = Joi.object({
  enrollmentId: Joi.number().required().min(0),
});

export const newSubscriptionSeatSchema = Joi.object({
  activityId: Joi.number().required().min(0),
  locationId: Joi.number().required().min(0),
  enrollmentId: Joi.number().required().min(0),
});
