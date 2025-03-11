import express from 'express';
import upload from '../middlewares/multer';
import { SuperadminController } from "../controller/superadmin.controller";
import AuthService from '../auth/auth.service';


const router = express.Router();






  router.get("/getUsers", AuthService.validateAccessToken, SuperadminController.getUsers);

  router.get("/getSliderVideosData", AuthService.validateAccessToken, SuperadminController.getSliderVideosData);
  router.get("/getDashboardTextsData", AuthService.validateAccessToken, SuperadminController.getDashboardTextsData);
  router.get("/getTeamData", AuthService.validateAccessToken, SuperadminController.getTeamData);
  router.get("/getPaymentPackagesData", AuthService.validateAccessToken, SuperadminController.getPaymentPackagesData);

  router.post("/uploadSliderVideo", AuthService.validateAccessToken, upload.single('video'), SuperadminController.uploadSliderVideo);
  router.post("/updateText", AuthService.validateAccessToken, SuperadminController.updateText);
  router.post("/updateTeam", AuthService.validateAccessToken, upload.single('photo'), SuperadminController.updateTeam);
  router.delete("/deleteSliderVideo", AuthService.validateAccessToken, SuperadminController.deleteSliderVideo);
  router.post("/createPaymentPackage", AuthService.validateAccessToken, SuperadminController.createPaymentPackage);
  router.post("/updatePaymentPackage", AuthService.validateAccessToken, SuperadminController.updatePaymentPackage);
  router.delete("/deletePaymentPackage", AuthService.validateAccessToken, SuperadminController.deletePaymentPackage);

  router.get("/getPaymentHistoryData", AuthService.validateAccessToken, SuperadminController.getPaymentHistoryData);
  

  router.get("/getfileLibraryData", AuthService.validateAccessToken, SuperadminController.getfileLibraryData);
  router.post("/uploadLibraryVideo", AuthService.validateAccessToken, upload.fields([{ name: 'video', maxCount: 1 },{ name: 'gif', maxCount: 1 }]), SuperadminController.uploadLibraryVideo);
  router.post("/bulkUploadLibraryVideo", AuthService.validateAccessToken, upload.fields([{ name: 'videos', maxCount: 100 },{ name: 'gifs', maxCount: 100 }]), SuperadminController.bulkUploadLibraryVideo);
  router.delete("/deleteLibraryVideo", AuthService.validateAccessToken, SuperadminController.deleteLibraryVideo);

  router.get("/getModerationVideos", AuthService.validateAccessToken,  SuperadminController.getModerationVideos);
  router.delete("/deleteModerationVideo", AuthService.validateAccessToken,  SuperadminController.deleteModerationVideo);
  router.post("/publishModerationVideo", AuthService.validateAccessToken,  SuperadminController.publishModerationVideo);
  router.post("/rejectModerationVideo", AuthService.validateAccessToken,  SuperadminController.rejectModerationVideo);

  router.get("/getMessagesData", AuthService.validateAccessToken, SuperadminController.getMessagesData);
  router.post("/sendMessage", AuthService.validateAccessToken, SuperadminController.sendMessage);
  router.delete("/deleteMessage", AuthService.validateAccessToken, SuperadminController.deleteMessage);
  
  router.get("/getNotificationsData", AuthService.validateAccessToken, SuperadminController.getNotificationsData);
  router.post("/sendNotification", AuthService.validateAccessToken, SuperadminController.sendNotification);
  router.post("/deleteNotification", AuthService.validateAccessToken, SuperadminController.deleteNotification);

  router.get("/getUserPersonalInfo", AuthService.validateAccessToken, SuperadminController.getUserPersonalInfo);
  router.get("/getUsersPersonalInfo/:userId", AuthService.validateAccessToken, SuperadminController.getUsersPersonalInfo);
  router.post("/ipnPaymentStatus", SuperadminController.ipnPaymentStatus);
 
  // /api/v1/superadmin/ipnPaymentStatus



export default router;






