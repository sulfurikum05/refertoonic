
import express from "express";

import AuthController from "../auth/auth.controller";
import Validation from "../middlewares/validation/validation";

const router = express.Router();

router.post("/login", Validation.loginValidate, AuthController.login);

export default router;
