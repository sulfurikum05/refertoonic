import RegisterScheme from "./schemes/users.schema";

class RegisterValidation {
  static registerValidate(req, res, next) {
    const { error } = RegisterScheme.validate(req.body, { abortEarly: false });
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

export default RegisterValidation;
