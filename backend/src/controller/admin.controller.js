
import { AdminServices } from "../services/admin.services";
import { SuccessHandlerUtil } from "../utils";
import { VipServices } from "../services/vip.services";

export class AdminController {
  static async getVideos(req, res, next) {
      try {
        const role = req.role;
        if (role !== "admin") {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          const userId = req.userId;
          const page = parseInt(req.query.page) || 0;
          const limit = parseInt(req.query.limit) || 16;
          const offset = page * limit;
          const data = await VipServices.getVideos(limit, offset, userId);
          SuccessHandlerUtil.handleList(res, next, data);
        }
      } catch (error) {
        next(error);
      }
    }

  static async getUsers(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const userId = req.userId;
        const data = await AdminServices.getUsers(userId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async createVipProUser(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const userId = req.userId;
        const { email } = req.body;
        const data = await AdminServices.createVipProUser(userId, email);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAvailableUsersCount(req, res, next) {
    try {
      const userId = req.userId;
      const data = await AdminServices.getAvailableUsersCount(userId);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async blockUser(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const email = req.body.email;
        const adminId = req.userId
        const data = await AdminServices.blockUser(email, adminId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async unblockUser(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const email = req.body.email;
        const adminId = req.userId
        const data = await AdminServices.unblockUser(email, adminId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error); 
    }
  }

  static async getMessagesData(req, res, next) {
    try {
      const userId = req.userId;
      const data = await AdminServices.getMessagesData(userId);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const userEmail = req.body.email
        const adminId = req.userId
        const data = await AdminServices.deleteUser(userEmail, adminId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getModerationVideos(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const adminId = req.userId;
        const data = await AdminServices.getModerationVideos(adminId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async changeModerationVideoStatus(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const videoId = req.body.id;
        const adminId = req.userId;
        const data = await AdminServices.changeModerationVideoStatus(videoId, adminId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteModerationVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const videoId = req.body.id;
        const adminId = req.userId;
        const data = await AdminServices.deleteModerationVideo(videoId, adminId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async rejectModerationVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const videoId = req.body.id;
        const adminId = req.userId;
        const data = await AdminServices.rejectModerationVideo(videoId, adminId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getFileLibraryData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const userId = req.userId;
        const data = await VipServices.getFileLibraryData(userId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getPaymentPackages(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await AdminServices.getPaymentPackages();
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getNotificationsData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const userId = req.userId;
        const data = await AdminServices.getNotificationsData(userId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async sendNotification(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const adminId = req.userId;
        const title = req.body.title;
        const message = req.body.message;
        const status = req.body.status;
        const data = await AdminServices.sendNotification(
          title,
          message,
          status,
          adminId
        );
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getSentNotificationsData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const adminId = req.userId;
        const data = await AdminServices.getSentNotificationsData(adminId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async upgradeUserCount(req, res, next) {
    try {
      const role = req.role;
      if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const adminId = req.userId;
        const userCount = req.body.userCount;
        const data = await AdminServices.upgradeUserCount(adminId, userCount);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }
}
