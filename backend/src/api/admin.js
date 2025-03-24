import express from 'express';
import { AdminController } from "../controller/admin.controller";
import AuthService from '../auth/auth.service';
import Validation from '../middlewares/validation/validation';

const router = express.Router();

  router.get("/getVideos", AuthService.validateAccessToken, AdminController.getVideos);
  router.get("/getUsers", AuthService.validateAccessToken, AdminController.getUsers);
  router.post("/createVipProUser", Validation.createVipProUserValidate, AuthService.validateAccessToken, AdminController.createVipProUser);
  router.get("/getAvailableUsersCount", AuthService.validateAccessToken, AdminController.getAvailableUsersCount);
  router.post("/blockUser", AuthService.validateAccessToken, AdminController.blockUser);
  router.post("/unblockUser", AuthService.validateAccessToken, AdminController.unblockUser);
  router.get("/getMessagesData", AuthService.validateAccessToken, AdminController.getMessagesData);
  router.post("/deleteUser", AuthService.validateAccessToken, AdminController.deleteUser);
  router.get("/getFileLibraryData", AuthService.validateAccessToken, AdminController.getFileLibraryData);
  router.get("/getPaymentPackages", AuthService.validateAccessToken, AdminController.getPaymentPackages);
  router.get("/getNotificationsData", AuthService.validateAccessToken, AdminController.getNotificationsData);
  router.post("/sendNotification", Validation.sendNotificationValidate, AuthService.validateAccessToken, AdminController.sendNotification);
  router.get("/getSentNotificationsData", AuthService.validateAccessToken, AdminController.getSentNotificationsData);
  router.get("/getModerationVideos", AuthService.validateAccessToken, AdminController.getModerationVideos);
  router.post("/changeModerationVideoStatus", AuthService.validateAccessToken, AdminController.changeModerationVideoStatus);
  router.delete("/deleteModerationVideo", AuthService.validateAccessToken, AdminController.deleteModerationVideo);
  router.post("/rejectModerationVideo", AuthService.validateAccessToken, AdminController.rejectModerationVideo);
  router.post("/upgradeUserCount", Validation.userCountUpgradeValidate, AuthService.validateAccessToken, AdminController.upgradeUserCount);
  
export default router;

