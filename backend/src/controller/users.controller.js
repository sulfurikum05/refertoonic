import { UsersServices } from "../services";
import { SuccessHandlerUtil } from "../utils";

export default class UsersController {
  
  static async register(req, res, next) {
    try {
      const { name, surname, email, password } = req.body;
      const data = await UsersServices.register(name, surname, email, password);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async getResetCode(req, res, next) {
    try {
      const email = req.body.email;
      const data = await UsersServices.getResetCode(email);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { code, newPassword } = req.body;
      const data = await UsersServices.resetPassword(code, newPassword);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async sendUnauthMessage(req, res, next) {
    try {
      const { email, name, text } = req.body;
      const data = await UsersServices.sendUnauthMessage(email, name, text);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async getDashboard(req, res, next) {
    try {
      const data = await UsersServices.getDashboard();
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async saveProfileData(req, res, next) {
    try {
      const photoPath = req.file ? req.file.filename : undefined;
      const uploadDir = req.body.uploadDir;
      let filePath = "";
      if (photoPath !== undefined && uploadDir !== undefined) {
        filePath = `${uploadDir}${photoPath} `;
      } else {
        filePath = undefined;
      }
      const userId = req.userId;
      const newData = {
        picture: filePath,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        address: req.body.address,
        website: req.body.website,
        birthday: req.body.birthday,
        gender: req.body.gender,
        about: req.body.about,
      };
      const data = await UsersServices.saveProfileData(newData, userId);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword, newPasswordConfirm } = req.body;
      const userId = req.userId;
      const data = await UsersServices.changePassword(
        oldPassword,
        newPassword,
        newPasswordConfirm,
        userId
      );
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async sendHelpMessage(req, res, next) {
    try {
      const { subject, message } = req.body;
      const userId = req.userId;
      const userName = req.name;
      const userEmail = req.email;
      const data = await UsersServices.sendHelpMessage(
        userId,
        userName,
        userEmail,
        subject,
        message
      );
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async getSentMessages(req, res, next) {
    try {
      const id = req.userId;
      const data = await UsersServices.getSentMessages(id);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async getPaymentPackages(req, res, next) {
    try {
      const role = req.role;
      const pp = req.pp;
      const data = await UsersServices.getPaymentPackages(role, pp);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async getVideos(req, res, next) {
    try {
      const role = req.role;
      if (role !== "user") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await UsersServices.getVideos(role);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getVideosBySearch(req, res, next) {
    try {
      const role = req.role;
      const keyword = req.query.searchValue;
      const data = await UsersServices.getVideosBySearch(role, keyword);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async getNotificationsData(req, res, next) {
    try {
      const userId = req.userId;
      const role = req.role;
      if (role !== "user") {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const data = await UsersServices.getNotificationsData(userId);
        SuccessHandlerUtil.handleList(res, next, data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async upgrade(req, res, next) {
    try {
      const userId = req.userId;
      const packageForUpgrade = req.body.packageForUpgrade;
      const period = req.body.period;
      const data = await UsersServices.upgrade(
        packageForUpgrade,
        period,
        userId
      );
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }

  static async getPaymentHistoryData(req, res, next) {
    try {
      const userId = req.userId;
      const data = await UsersServices.getPaymentHistoryData(userId);
      SuccessHandlerUtil.handleList(res, next, data);
    } catch (error) {
      next(error);
    }
  }
}
