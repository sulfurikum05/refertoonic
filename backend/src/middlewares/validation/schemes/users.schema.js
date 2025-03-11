// NPM Modules
import Joi from 'joi';

const RegisterScheme = Joi.object({
      name: Joi.string().min(1).max(50).required(),
      surname: Joi.string().min(1).max(50).allow(''),
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      password: Joi.string().min(6).max(50).required()
    })


export default RegisterScheme;
