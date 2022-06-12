import Joi from 'joi';

interface SelectRoom {
  id: number;
  enrollmentId: number;
}

export const selectRoomSchema = Joi.object<SelectRoom>({
  id: Joi.number().required().min(0),
  enrollmentId: Joi.number().required().min(0),
});

export const deleteBedRentalSchema = Joi.object({
  roomId: Joi.number().required().min(0),
  enrollmentId: Joi.number().required().min(0),
});
