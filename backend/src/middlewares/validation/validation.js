
import Schemes from "./schemes/validation.schemes";

const schemes = new Schemes();


export default class Validation {
  
  static loginValidate(req, res, next) {
    const { error } = schemes.LoginScheme.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .json({
          success: false,
          errors: error.details.map((err) => err.message),
        });
    }
    next();
  }

  static registerValidate(req, res, next) {
    const { error } = schemes.RegisterScheme.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .json({
          success: false,
          errors: error.details.map((err) => err.message),
        });
    }
    next();
  }

  static HelpMessageValidate(req, res, next) {
    const { error } = schemes.HelpMessageScheme.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .json({
          success: false,
          errors: error.details.map((err) => err.message),
        });
    }
    next();
  }

  static userCountUpgradeValidate(req, res, next) {
    const { error } = schemes.userCountUpgradeScheme.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .json({
          success: false,
          errors: error.details.map((err) => err.message),
        });
    }
    next();
  }
}
