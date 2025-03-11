// NPM modules
import Joi from 'joi';

const LoginScheme = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      password: Joi.string().min(6).required(),
  
    })

export default LoginScheme;
