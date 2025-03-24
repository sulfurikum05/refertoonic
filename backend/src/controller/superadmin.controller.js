import { SuperadminService } from "../services/superadmin.service";
import { SuccessHandlerUtil } from "../utils";
import { VipServices } from "../services/vip.services";

export class SuperadminController {
  static async getVideos(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
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
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await SuperadminService.getUsers();
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {    
      next(error);
    }
  }

  static async getSliderVideosData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await SuperadminService.getSliderVideosData();
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getDashboardTextsData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await SuperadminService.getDashboardTextsData();
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getTeamData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await SuperadminService.getTeamData();
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getPaymentPackagesData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await SuperadminService.getPaymentPackagesData();
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async uploadSliderVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const { uploadDir } = req.body;
        const videoPath = req.file ? req.file.filename : null;
        const filePath = `${uploadDir}${videoPath} `;
        const data = await SuperadminService.uploadSliderVideo(filePath);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteSliderVideo(req, res, next) {
    try {
      const id = req.body.id;
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await SuperadminService.deleteSliderVideo(id);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateText(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const header = req.body.updatedData[0].text || "";
        const title = req.body.updatedData[1].text || "";
        const text = req.body.updatedData[2].text || "";
        const id = req.body.id;
        const data = await SuperadminService.updateText(
          header,
          title,
          text,
          id
        );
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateTeam(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const photoPath = req.file ? req.file.filename : null;
        const uploadDir = req.body.uploadDir;
        const filePath = `${uploadDir}${photoPath} `;
        const id = req.body.id;
        const data = {
          role: req.body.field_0,
          name: req.body.field_1,
          fb_link: req.body.field_2,
          in_link: req.body.field_3,
          wa_link: req.body.field_4,
          tg_link: req.body.field_5,
        };
        if (photoPath !== null) {
          data.photo = filePath;
        }
        const resData = await SuperadminService.updateTeam(data, id);
        SuccessHandlerUtil.handleList(res, next, resData);
      }
    } catch (error) {
      next(error);
    }
  }

  static async updatePaymentPackage(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const title = req.body.updatedData[0].text || "";
        const price = req.body.updatedData[1].text || "";
        const text = req.body.updatedData[2].text || "";
        const id = req.body.id;
        const data = await SuperadminService.updatePaymentPackage(
          title,
          price,
          text,
          id
        );
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deletePaymentPackage(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const id = req.body.id;
        const data = await SuperadminService.deletePaymentPackage(id);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getPaymentHistoryData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await SuperadminService.getPaymentHistoryData();
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getfileLibraryData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const offset = page * limit;
        const data = await SuperadminService.getfileLibraryData(limit, offset);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async uploadLibraryVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { video, gif } = req.files;
      const userId = req.userId;
      const { uploadDir, title, keywords } = req.body;
      const videoName = video[0]?.filename;
      const gifName = gif[0]?.filename;
      const videoPath = `${uploadDir}${videoName}`;
      const gifPath = `${uploadDir}${gifName}`;
      const data = await SuperadminService.uploadLibraryVideo(
        videoPath,
        gifPath,
        title,
        keywords,
        userId
      );
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async bulkUploadLibraryVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userId = req.userId;
      const { uploadDir } = req.body;
      const { videos, gifs } = req.files;
      if (!videos || videos.length === 0) {
        return res.status(400).json({ success: true, message: "No video files uploaded" });
      }
      if (!gifs || gifs.length === 0) {
        return res.status(400).json({ success: true, message: "No gif files uploaded" });
      }
      const data = await SuperadminService.bulkUploadLibraryVideo(
        videos,
        gifs,
        uploadDir,
        userId
      );
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async downloadVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const { filename } = req.params;
        const filePath = await SuperadminService.downloadVideo(filename);
        const downloadName = `downloaded_${filename}`;
        res.sendFile(filePath, {
          headers: {
              'Content-Disposition': `attachment; filename="${downloadName}"`,
              'Content-Type': 'video/mp4'
          }
      }, (err) => {
          if (err) {
              res.status(404).send('Video not found');
          }
      });
      }
    } catch (error) {
      next(error);
    }
  }
  
  static async deleteLibraryVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const id = req.body.id;
        const data = await SuperadminService.deleteLibraryVideo(id);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async unpublishVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const id = req.body.id;
        const data = await SuperadminService.unpublishVideo(id);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

    static async getReferencesBySearch(req, res, next) {
      try {
        const keyword = req.params.searchValue;
        console.log(keyword);
        const data = await SuperadminService.getReferencesBySearch(keyword);
        SuccessHandlerUtil.handleList(res, next, data);
      } catch (error) {
        next(error);
      }
    }
  
  static async publishSuperadminUploadedVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const id = req.body.id;
        const data = await SuperadminService.publishSuperadminUploadedVideo(id);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }
  
  static async getModerationVideos(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await SuperadminService.getModerationVideos();
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteModerationVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const id = req.body.id;
        const data = await SuperadminService.deleteModerationVideo(id);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async publishModerationVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const { uploadDir } = req.body;
        const gifPath = req.file ? req.file.filename : null;
        const filePath = `${uploadDir}${gifPath} `;
        const {id, title, keywords} = req.body;
        const data = await SuperadminService.publishModerationVideo(id, title, keywords, filePath);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async rejectModerationVideo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const id = req.body.id;
        const data = await SuperadminService.rejectModerationVideo(id);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getMessagesData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await SuperadminService.getMessagesData();
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async sendMessage(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const { email, subject, message } = req.body;
        const data = await SuperadminService.sendMessage(
          email,
          subject,
          message
        );
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteMessage(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const id = req.body.id;
        const data = await SuperadminService.deleteMessage(id);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getUserPersonalInfo(req, res, next) {
    try {
      const id = req.userId;
      const role = req.role;
      const data = await SuperadminService.getUserPersonalInfo(id);
      data[0].role = role;
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async getUsersPersonalInfo(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const userId = req.params.userId;
        const data = await SuperadminService.getUsersPersonalInfo(userId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getUserPayments(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const userId = req.params.userId;
        const data = await SuperadminService.getUserPayments(userId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }
  
  static async updatePaymentSuperadmin(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const status = req.body[1];
        const expire_at = req.body[2];
        const date = new Date(expire_at)
        const order_id = req.body.order_id;
        const data = await SuperadminService.updatePaymentSuperadmin(status, date, order_id);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async editUserPackage(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const role = req.body[3];
        const payment_package = req.body[4];
        const id = req.body.user_id;
        const data = await SuperadminService.editUserPackage(role, payment_package, id);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }
  

  
  static async getNotificationsData(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await SuperadminService.getNotificationsData();
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async sendNotification(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const title = req.body.title;
        const message = req.body.message;
        const user = req.body.receivers[0].selected;
        const vip = req.body.receivers[1].selected;
        const admin = req.body.receivers[2].selected;
        const status = req.body.status;
        const data = await SuperadminService.sendNotification(
          title,
          message,
          user,
          vip,
          admin,
          status
        );
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteNotification(req, res, next) {
    try {
      const role = req.role;
      if (role !== "superadmin") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const id = req.body.id;
        const data = await SuperadminService.deleteNotification(id);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async ipnPaymentStatus(req, res, next) {
    try {
      const payment_status = req.body.payment_status;
      const order_id = req.body.order_id;
      const logs = req.body
      await SuperadminService.ipnPaymentStatus(payment_status, order_id, logs);
      SuccessHandlerUtil.handleList(res, next);
    } catch (error) {
      next(error);
    }
  }
}
