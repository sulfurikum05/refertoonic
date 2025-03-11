import LoginScheme from "./schemes/auth.schema";

class LoginValidation {
  static loginValidate(req, res, next) {
    const { error } = LoginScheme.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(1111);

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

export default LoginValidation;
