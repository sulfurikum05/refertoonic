// NPM Modules
import express from "express";

import AuthController from "../auth/auth.controller";
import LoginValidation from "../middlewares/validation/auth.validation";

const router = express.Router();

router.post("/login", LoginValidation.loginValidate, AuthController.login);

export default router;
