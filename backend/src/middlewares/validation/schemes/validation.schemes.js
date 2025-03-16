import Joi from "joi";

export default class Schemes {
  LoginScheme = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).max(50).pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).required(),
  });

  RegisterScheme = Joi.object({
    name: Joi.string().pattern(/^[A-Za-z]+$/).min(1).max(50).required(),
    surname: Joi.string().pattern(/^[A-Za-z]+$/).min(1).max(50).allow(""),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).max(50).pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).required(),
  });

  HelpMessageScheme = Joi.object({
    subject: Joi.string().pattern(/^[A-Za-z0-9]+$/).min(1).max(50).required(),
    message: Joi.string().pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).min(1).max(1000).required(),
  });

  userCountUpgradeScheme = Joi.object({
    userCount: Joi.number().min(5).required()
  });
}