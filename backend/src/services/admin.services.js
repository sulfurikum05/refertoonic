// Local Modules

import { AdminModel } from "../models/admin.model";
import { UsersModel } from "../models";
import { PaymentService } from "../services/paymentService";
import { CryptoUtil } from "../utils";
import { DeleteFiles } from "../services/delete.file";
import knex from "knex";
import knexConfigs from "../../knex.configs";
const pg = knex(knexConfigs.development);
import dotenv from "dotenv";
dotenv.config();

export class AdminServices {
  
  static async getUsers(userId) {
    return await AdminModel.getUsers(userId);
  }

  static async createVipProUser(userId, email) {
    const trx = await pg.transaction();
    try {
      const admin = await AdminModel.getAdminById(userId, trx);
      const usersCountAll = admin[0].new_or_existing * 10;
      const currentUsers = await AdminModel.getUsersByAdminId(userId, trx);
      const currentUsersCount = currentUsers.length;
      if (usersCountAll <= currentUsersCount) {
        await trx.commit();
        return {
          message:
            "Вы достигли лимита на создание пользователей. Для увеличения лимита приобретите доп. пакет.",
        };
      } else {
        const user = await UsersModel.getUserByEmail(email, trx);
        if (user.length !== 0) {
          if (user[0].payment_package == "vipPro") {
            await trx.commit();
            return { message: "Пользователь уже состоит в организации" };
          } else if (user[0].role == "vip") {
            const data = { payment_package: "vipPro", admin_id: userId };
            await AdminModel.updateVipUserPaymentPackageToVipPro(
              data,
              email,
              trx
            );
          } else if (user[0].role == "user") {
            const data = {
              role: "vip",
              payment_package: "vipPro",
              admin_id: userId,
            };
            await AdminModel.updateUserPaymentPackageToVipPro(data, email, trx);
          } else if (user[0].role == "admin" || user[0].role == "superadmin") {
            await trx.commit();
            return {
              message: "Данного пользователя невозможно добавить в организацию",
            };
          }
        } else {
          const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let length = 8;
          let password = "";
          for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          const hashedPassword = CryptoUtil.createHash(password);
          const data = {
            name: "Name",
            surname: "Surname",
            email: email,
            password: hashedPassword,
            role: "vip",
            payment_package: "vipPro",
            admin_id: userId,
            new_or_existing: `0`,
            status: `unblock`,
            created_at: new Date().toISOString(),
          };
          await AdminModel.createNewUser(data, trx);
          await trx.commit();
          return { message: "User created successfully" };
        }
      }
      await trx.commit();
      return { message: "User created successfully" };

    } catch (error) {
      await trx.rollback();
    }
  }

  static async getAvailableUsersCount(userId) {
    const trx = await pg.transaction();
    try {
      const admin = await AdminModel.getAdminById(userId, trx);
      const usersCountAll = admin[0].new_or_existing * 10;
      const currentUsers = await AdminModel.getUsersByAdminId(userId, trx);
      const currentUsersCount = currentUsers.length;
      await trx.commit();
      return usersCountAll - currentUsersCount;
    } catch (error) {
      await trx.rollback();
    }
  }

  static async blockUser(email) {
    await AdminModel.blockUser(email);
    return { message: "User blocked successfully" };
  }

  static async unblockUser(email) {
    await AdminModel.unblockUser(email);
    return { message: "User unblocked successfully" };
  }

  static async getMessagesData(userId) {
    const trx = await pg.transaction();
    try {
      const users = await AdminModel.getUsersByAdminId(userId, trx);
      const allMessages = await AdminModel.getAllMessages(trx);
      const messages = [];
      users.forEach((user) => {
        allMessages.forEach((message) => {
          if (message.user_id == user.id) {
            messages.push(message);
          }
        });
      });
      await trx.commit();
      return messages;
    } catch (error) {
      await trx.rollback();
    }
  }

  static async deleteUser(userEmail, adminId) {
    const trx = await pg.transaction();
    try {
      const data = {
        admin_id: null,
        role: "user",
        payment_package: "free"
      }
      const user = await AdminModel.getUserByEmail(userEmail, trx)
      if (user.length == 0) {
        await trx.commit();
        return { message: "User not exist" };
      }
      if (Number(user[0].admin_id) !== Number(adminId)) {
        await trx.commit();
        return { message: "You dont have permitions to delete this user" };
      }else{
        if (user[0].status == "block") {
          data.status = "unblock"
        }
        await AdminModel.deleteUser(userEmail, data, trx)
        await trx.commit();
        return { message: "User deleted successfully" };
      }
    } catch (error) {
      await trx.rollback();
    }

  }

  static async getModerationVideos(adminId) {
    const trx = await pg.transaction();
    try {
      const users = await AdminModel.getUsersByAdminId(adminId, trx);
      const usersId = [];
      users.forEach((user) => {
        usersId.push(user.id);
      });
      const videos = await AdminModel.getModerationVideosByUsersId(
        usersId,
        trx
      );
      await trx.commit();
      return videos;
    } catch (error) {
      await trx.rollback();
    }
  }

  static async changeModerationVideoStatus(videoId) {
    const data = { status: 0 };
    await AdminModel.changeModerationVideoStatus(data, videoId);
    return { message: "Video successfully sent to moderator" };
    }
  
  static async deleteModerationVideo(id) {
    const trx = await pg.transaction();
    try {
      const video = await AdminModel.getVideosById(id, trx);
      const filePath = video[0].video_url;
      const cleanPath = filePath.trim();
      await DeleteFiles.deleteFileFromStorage(cleanPath);
      await AdminModel.deleteModerationVideoById(id, trx);
      await trx.commit();
      return { message: "Video deleted successfully" };
    } catch (error) {
      await trx.rollback();
    }
  }

  static async publishModerationVideo(id) {
    const data = { status: 1 };
    await AdminModel.publishModerationVideo(data, id);
    return { message: "Video published successfully" };
  }

  static async rejectModerationVideo(id) {
    const data = { status: -1 };
    await AdminModel.rejectModerationVideo(data, id);
    return { message: "Video rejected successfully" };
  }

  static async getNotificationsData(userId) {
    const trx = await pg.transaction();
    try {
      const admin = await AdminModel.getAdminById(userId, trx);
      const adminNotification = await AdminModel.getNotificationsData(trx);
      const data = [];
      const adminCreateDate = new Date(admin[0].created_at);
      adminNotification.forEach((notification) => {
        let notificationCreateDate = new Date(notification.send_at);
        if (adminCreateDate < notificationCreateDate) {
          data.push(notification);
        }
      });
      await trx.commit();
      return data;
    } catch (error) {
      await trx.rollback();
    }
  }

  static async sendNotification(title, message, status, adminId) {
    const data = {
      reciever_user: 0,
      reciever_vip: 1,
      reciever_admin: 0,
      title: title,
      text: message,
      status: status,
      sender: adminId,
    };
    await AdminModel.sendNotification(data, adminId);
    return { message: "Notification sent successfully" };
  }

  static async getSentNotificationsData(adminId) {
    return await AdminModel.getSentNotificationsData(adminId);
  }

  static async upgradeUserCount(adminId, userCount) {
    const trx = await pg.transaction();
    try {
      const price = userCount * 1;
      const period = "";
      const packageForUpgrade = "Upgrade users count";
      const data = await PaymentService.createPayment(
        price,
        period,
        packageForUpgrade
      );
      data.user_id = adminId;
      data.payment_id = Math.floor(
        1000000000 + Math.random() * 9000000000
      ).toString();
      data.method = "upgrade";
      data.package = "users count";
      data.price = data.price_amount;
      delete data.price_amount;
      data.period = period;
      data.status = "Processing";
      delete data.price_currency;
      delete data.ipn_callback_url;
      delete data.success_url;
      delete data.cancel_url;
      await UsersModel.createProcessingPayment(data, trx);
      await trx.commit();
      return data.invoice_url;
    } catch (error) {
      await trx.rollback();
    }
  }
}
