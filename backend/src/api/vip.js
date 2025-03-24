
import express from 'express';
import upload from '../middlewares/multer';
import { VipController } from '../controller/vip.controller';
import AuthService from '../auth/auth.service';
import Validation from '../middlewares/validation/validation';




const router = express.Router();

  router.get("/getVideos", AuthService.validateAccessToken, VipController.getVideos);
  router.post("/uploadLibraryVideo", Validation.videoUploadValidate, AuthService.validateAccessToken, upload.fields([{ name: 'video', maxCount: 1 }]), VipController.uploadLibraryVideo);
  router.get("/getFileLibraryData", AuthService.validateAccessToken, VipController.getFileLibraryData);
  router.get("/getPaymentPackages", AuthService.validateAccessToken, VipController.getPaymentPackages);
  router.get("/getNotificationsData", AuthService.validateAccessToken, VipController.getNotificationsData);
  router.get("/getWishlistData", AuthService.validateAccessToken, VipController.getWishlistData);
  router.post("/addVideoToWishlist", AuthService.validateAccessToken, VipController.addVideoToWishlist);
  router.post("/removeVideoFromWishlist", AuthService.validateAccessToken, VipController.removeVideoFromWishlist);
  router.post("/getVideosBySearch/:searchValue", AuthService.validateAccessToken, VipController.getVideosBySearch);
  router.post("/upgrade", Validation.upgradeValidate, AuthService.validateAccessToken, VipController.upgrade);
  router.post("/extend", Validation.upgradeValidate, AuthService.validateAccessToken, VipController.extend);

export default router;
