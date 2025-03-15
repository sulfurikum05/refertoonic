// Local Modules
import { VipServices } from "../services/vip.services";
import { SuccessHandlerUtil } from "../utils";

export class VipController {
  
  static async getVideos(req, res, next) {
    try {
      const role = req.role;
      if (role === "vip" || role === "admin" || role === "superadmin") {
        const userId = req.userId;
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 16;
        const offset = page * limit;
        const data = await VipServices.getVideos(limit, offset, userId);
        SuccessHandlerUtil.handleList(res, next, data);
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async uploadLibraryVideo(req, res, next) {
    try {
      const role = req.role;
      if (role == "vip" || role == "admin") {
        const userId = req.userId;
        const { uploadDir, title, keywords } = req.body;
        const videoObject = req.files?.["video"]?.[0] || null;
        if (!videoObject) {
          return res.status(400).json({ error: "Видео не загружено" });
        }
        const videoName = videoObject?.filename;
        const videoPath = `${uploadDir}${videoName} `;
        const data = await VipServices.uploadLibraryVideo(
          videoPath,
          title,
          keywords,
          userId
        );
        SuccessHandlerUtil.handleList(res, next, data);
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getFileLibraryData(req, res, next) {
    try {
      const role = req.role;
      if (role == "vip" || role == "admin") {
        const userId = req.userId;
        const data = await VipServices.getFileLibraryData(role, userId);
        SuccessHandlerUtil.handleList(res, next, data);
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getWishlistData(req, res, next) {
    try {
      const userId = req.userId;
      const data = await VipServices.getWishlistData(userId);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async addVideoToWishlist(req, res, next) {
    try {
      const userId = req.userId;
      const videoId = req.body.id;
      const data = await VipServices.addVideoToWishlist(userId, videoId);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async removeVideoFromWishlist(req, res, next) {
    try {
      const userId = req.userId;
      const videoId = req.body.id;
      const data = await VipServices.removeVideoFromWishlist(userId, videoId);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async getNotificationsData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "vip") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const userId = req.userId;
        const data = await VipServices.getNotificationsData(userId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async upgrade(req, res, next) {
    try {
      const userId = req.userId;
      const pp = req.pp;
      const packageForUpgrade = req.body.packageForUpgrade;
      const period = req.body.period;

      const data = await VipServices.upgrade(
        packageForUpgrade,
        period,
        userId,
        pp
      );
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async extend(req, res, next) {
    try {
      const userId = req.userId;
      const pp = req.pp;
      const packageForExtend = req.body.packageForUpgrade;
      const period = req.body.period;

      const data = await VipServices.extend(
        packageForExtend,
        period,
        userId,
        pp
      );
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }
  
}
