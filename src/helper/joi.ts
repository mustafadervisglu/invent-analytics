import * as Joi from "joi";

const option = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

export const JoiD = Joi.defaults((schema) => schema.options(option));
