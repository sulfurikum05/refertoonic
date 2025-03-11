
import express from 'express';
import upload from '../middlewares/multer';
import { UsersController } from '../controller';
import AuthService from '../auth/auth.service';
import RegisterValidation from '../middlewares/validation/users.validation';



const router = express.Router();


  router.post("/register", RegisterValidation.registerValidate, UsersController.register);
  router.post("/getResetCode", UsersController.getResetCode);
  router.post("/resetPassword", UsersController.resetPassword);
  router.post("/sendUnauthMessage", UsersController.sendUnauthMessage);
  router.get("/getDashboard", UsersController.getDashboard);
  


  router.post("/saveProfileData", AuthService.validateAccessToken, upload.single('photo'), UsersController.saveProfileData);
  router.post("/changePassword", AuthService.validateAccessToken, UsersController.changePassword);
  router.get("/getSentMessages", AuthService.validateAccessToken, UsersController.getSentMessages);
  router.post("/sendHelpMessage", AuthService.validateAccessToken, UsersController.sendHelpMessage);
  router.get("/getPaymentPackages", AuthService.validateAccessToken, UsersController.getPaymentPackages);
  router.get("/getVideos", AuthService.validateAccessToken, UsersController.getVideos);
  router.get("/getVideosBySearch", AuthService.validateAccessToken, UsersController.getVideosBySearch);
  router.get("/getNotificationsData", AuthService.validateAccessToken, UsersController.getNotificationsData);
  router.post("/upgrade", AuthService.validateAccessToken, UsersController.upgrade);
  router.get("/getPaymentHistoryData", AuthService.validateAccessToken, UsersController.getPaymentHistoryData);

  // #GOOGLE LOGIN
  // router.get("/google/login", passport.authenticate("google", {scope : ["email", "profile"]}))

  // router.get("/google/auth/callback", passport.authenticate("google", {successRedirect : "/api/v1/users/success"}), UsersController.saveGoogleLoginData)

  // router.get("/success", (req, res) => {
  //     res.send("yeah")
  // })




export default router;
