import express from 'express';
import upload from '../middlewares/multer';
import { AdminController } from "../controller/admin.controller";
import AuthService from '../auth/auth.service';
import Validation from '../middlewares/validation/validation';

const router = express.Router();

  router.get("/getUsers", AuthService.validateAccessToken, AdminController.getUsers);
  router.post("/createVipProUser", AuthService.validateAccessToken, AdminController.createVipProUser);
  router.get("/getAvailableUsersCount", AuthService.validateAccessToken, AdminController.getAvailableUsersCount);
  router.post("/blockUser", AuthService.validateAccessToken, AdminController.blockUser);
  router.post("/unblockUser", AuthService.validateAccessToken, AdminController.unblockUser);
  router.get("/getMessagesData", AuthService.validateAccessToken, AdminController.getMessagesData);
  // router.post("/deleteMessage", AuthService.validateAccessToken, AdminController.deleteMessage);
  // router.post("/resendMessage", AuthService.validateAccessToken, AdminController.resendMessage);
  router.post("/deleteUser", AuthService.validateAccessToken, AdminController.deleteUser);
  router.get("/getNotificationsData", AuthService.validateAccessToken, AdminController.getNotificationsData);
  router.post("/sendNotification", AuthService.validateAccessToken, AdminController.sendNotification);
  router.get("/getSentNotificationsData", AuthService.validateAccessToken, AdminController.getSentNotificationsData);
  router.get("/getModerationVideos", AuthService.validateAccessToken, AdminController.getModerationVideos);
  router.post("/changeModerationVideoStatus", AuthService.validateAccessToken, AdminController.changeModerationVideoStatus);
  router.delete("/deleteModerationVideo", AuthService.validateAccessToken, AdminController.deleteModerationVideo);
  router.post("/publishModerationVideo", AuthService.validateAccessToken, AdminController.publishModerationVideo);
  router.post("/rejectModerationVideo", AuthService.validateAccessToken, AdminController.rejectModerationVideo);
  router.post("/upgradeUserCount", Validation.userCountUpgradeValidate, AuthService.validateAccessToken, AdminController.upgradeUserCount);
  
export default router;


