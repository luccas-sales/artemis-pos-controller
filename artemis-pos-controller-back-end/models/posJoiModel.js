import Joi from 'joi';

const postCheckoutSchema = Joi.object({
  name: Joi.string().required(),
  lastVerification: Joi.date().required(),
  lastPurchase: Joi.date().required(),
});

const postPosSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  checkouts: Joi.array().items(postCheckoutSchema).required(),
});

export const postValidatePos = validation(postPosSchema);

const putPosSchema = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
});

export const putValidatePos = validation(putPosSchema);

const putCheckoutSchema = Joi.object({
  name: Joi.string(),
  lastVerification: Joi.date(),
  lastPurchase: Joi.date(),
});

export const putValidateCheckout = validation(putCheckoutSchema);

function validation(schema) {
  return function schemaValidation(info) {
    return schema.validate(info, { abortEarly: false });
  };
}
