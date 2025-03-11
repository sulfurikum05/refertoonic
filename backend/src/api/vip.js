
import express from 'express';
import upload from '../middlewares/multer';
import { VipController } from '../controller/vip.controller';
import AuthService from '../auth/auth.service';




const router = express.Router();

  router.get("/getVideos", AuthService.validateAccessToken, VipController.getVideos);
  router.post("/uploadLibraryVideo", AuthService.validateAccessToken, upload.fields([{ name: 'video', maxCount: 1 }]), VipController.uploadLibraryVideo);
  router.get("/getFileLibraryData", AuthService.validateAccessToken, VipController.getFileLibraryData);
  router.get("/getNotificationsData", AuthService.validateAccessToken, VipController.getNotificationsData);
  router.get("/getWishlistData", AuthService.validateAccessToken, VipController.getWishlistData);
  router.post("/addVideoToWishlist", AuthService.validateAccessToken, VipController.addVideoToWishlist);
  router.post("/removeVideoFromWishlist", AuthService.validateAccessToken, VipController.removeVideoFromWishlist);
  router.post("/upgrade", AuthService.validateAccessToken, VipController.upgrade);

export default router;
