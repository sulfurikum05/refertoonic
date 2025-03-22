
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

  static unauthMessageValidate(req, res, next) {
    const { error } = schemes.UnauthMessageScheme.validate(req.body, { abortEarly: false });
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

  static helpMessageValidate(req, res, next) {
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
    const { error } = schemes.UserCountUpgradeScheme.validate(req.body, { abortEarly: false });
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

  static confirmEmailValidate(req, res, next) {
    const { error } = schemes.ConfirmEmailScheme.validate(req.body, { abortEarly: false });
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
  
  static emailValidate(req, res, next) {
    const { error } = schemes.EmailScheme.validate(req.body, { abortEarly: false });
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

  static resetPasswordValidate(req, res, next) {
    const { error } = schemes.ResetPasswordScheme.validate(req.body, { abortEarly: false });
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
  
  static changePasswordValidate(req, res, next) {
    const { error } = schemes.ChangePasswordScheme.validate(req.body, { abortEarly: false });
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
  
  static changeInfoValidate(req, res, next) {
    const { error } = schemes.ChangeInfoScheme.validate(req.body, { abortEarly: false });
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
  
  static videoUploadValidate(req, res, next) {
    const { error } = schemes.VideoUploadScheme.validate(req.body, { abortEarly: false });
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

  static upgradeValidate(req, res, next) {
    const { error } = schemes.UpgradeScheme.validate(req.body, { abortEarly: false });
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

  static createVipProUserValidate(req, res, next) {
    const { error } = schemes.CreateVipProUserScheme.validate(req.body, { abortEarly: false });
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
  
  static sendNotificationValidate(req, res, next) {
    const { error } = schemes.SendNotificationScheme.validate(req.body, { abortEarly: false });
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

  static updateTextValidate(req, res, next) {
    const { error } = schemes.UpdateTextScheme.validate(req.body, { abortEarly: false });
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

  static uploadLibraryVideoValidate(req, res, next) {
    const { error } = schemes.UploadLibraryVideoScheme.validate(req.body, { abortEarly: false });
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

  static sendMessageValidate(req, res, next) {
    const { error } = schemes.SendMessageScheme.validate(req.body, { abortEarly: false });
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

  static sendNotificationSuperadminValidate(req, res, next) {
    const { error } = schemes.SendNotificationSuperadminScheme.validate(req.body, { abortEarly: false });
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

  static updatePaymentSuperadminValidate(req, res, next) {
    const { error } = schemes.UpdatePaymentSuperadminScheme.validate(req.body, { abortEarly: false });
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

  static editUserPackageValidate(req, res, next) {
    const { error } = schemes.EditUserPackageScheme.validate(req.body, { abortEarly: false });
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
