import express from 'express';
import upload from '../middlewares/multer';
import { UsersController } from '../controller';
import AuthService from '../auth/auth.service';
import Validation from '../middlewares/validation/validation';



const router = express.Router();

  router.post("/register", Validation.registerValidate, UsersController.register);
  router.post("/confirmEmail", Validation.confirmEmailValidate, UsersController.confirmEmail);
  router.post("/getConfirmationCode", Validation.emailValidate, UsersController.getConfirmationCode);
  router.post("/getResetCode", Validation.emailValidate, UsersController.getResetCode);
  router.post("/resetPassword", Validation.resetPasswordValidate, UsersController.resetPassword);
  router.post("/sendUnauthMessage",Validation.unauthMessageValidate, UsersController.sendUnauthMessage);
  router.get("/getDashboard", UsersController.getDashboard);
  router.post("/saveProfileData", Validation.changeInfoValidate, AuthService.validateAccessToken, upload.single('photo'), UsersController.saveProfileData);
  router.post("/changePassword", Validation.changePasswordValidate, AuthService.validateAccessToken, UsersController.changePassword);
  router.get("/getSentMessages", AuthService.validateAccessToken, UsersController.getSentMessages);
  router.post("/sendHelpMessage", Validation.helpMessageValidate, AuthService.validateAccessToken, UsersController.sendHelpMessage);
  router.get("/getPaymentPackages", AuthService.validateAccessToken, UsersController.getPaymentPackages);
  router.get("/getVideos", AuthService.validateAccessToken, UsersController.getVideos);
  router.get("/getVideosBySearch", AuthService.validateAccessToken, UsersController.getVideosBySearch);
  router.get("/getNotificationsData", AuthService.validateAccessToken, UsersController.getNotificationsData);
  router.post("/upgrade", Validation.upgradeValidate, AuthService.validateAccessToken, UsersController.upgrade);
  router.get("/getPaymentHistoryData", AuthService.validateAccessToken, UsersController.getPaymentHistoryData);

export default router;
