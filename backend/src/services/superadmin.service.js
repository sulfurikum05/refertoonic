import path from 'path';
import { SuperadminModel } from "../models/superadmin.model";
import { UsersModel } from "../models/users.model";
import SendEmail from "../middlewares/nodemailer";
import { DeleteFiles } from "../services/delete.file";
import knex from "knex";
import knexConfigs from "../../knex.configs";
const pg = knex(knexConfigs.development);

export class SuperadminService {
  static async getUsers() {
    return SuperadminModel.getUsers();
  }

  static async getSliderVideosData() {
    return await SuperadminModel.getSliderVideosData();
  }

  static async getDashboardTextsData() {
    return await SuperadminModel.getDashboardTextsData();
  }

  static async getTeamData() {
    return await SuperadminModel.getTeamData();
  }

  static async getPaymentPackagesData() {
    return await SuperadminModel.getPaymentPackagesData();
  }

  static async uploadSliderVideo(videoPath) {
    const video = {
      video: videoPath,
    };
    await SuperadminModel.uploadSliderVideo(video);
    return { success: true, message: "Video uploaded successfully" };
  }

  static async updateText(header, title, text, id) {
    const newData = {
      header: header,
      title: title,
      text: text,
    };
    await SuperadminModel.updateText(newData, id);
    return { success: true, message: "Text uploaded successfully" };
  }

  static async deleteSliderVideo(id) {
    const trx = await pg.transaction();
    try {
      const file = await SuperadminModel.getSliderVideoById(id, trx);
      const filePath = file[0].video;
      const cleanPath = filePath.trim();
      await DeleteFiles.deleteFileFromStorage(cleanPath);
      await SuperadminModel.deleteSliderVideo(id, trx);
      await trx.commit();
      return { success: true, message: "Video deleted successfully" };
    } catch (error) {
      await trx.rollback();
    }
  }

  // static async createPaymentPackage(newData) {
  //   const data = {
  //     title: newData[0].element,
  //     price: newData[1].element,
  //     text: newData[2].element,
  //   };
  //   await SuperadminModel.createPaymentPackage(data);
  //   return { success: true, message: "Payment package created successfully" };
  // }

  static async updateTeam(data, id) {
    await SuperadminModel.updateTeam(data, id);
    return { success: true, message: "Team updated successfully" };
  }

  static async updatePaymentPackage(title, price, text, id) {
    const newData = {
      title: title,
      price: price,
      text: text,
    };
    await SuperadminModel.updatePaymentPackage(newData, id);
    return { success: true, message: "Payment package updated successfully" };
  }

  static async deletePaymentPackage(id) {
    await SuperadminModel.deletePaymentPackage(id);
    return { success: true, message: "Payment package deleted successfully" };
  }

  static async getPaymentHistoryData() {
    return await SuperadminModel.getPaymentHistoryData();
  }

  static async getfileLibraryData(limit, offset) {
    return await SuperadminModel.getfileLibraryData(limit, offset);
  }

  static async uploadLibraryVideo(videoPath, gifPath, title, keywords, userId) {
    const video = {
      user_id: userId,
      video_url: videoPath,
      gif_url: gifPath,
      title: title,
      keywords: keywords,
      status: 1,
    };
    await SuperadminModel.uploadLibraryVideo(video);
    return { success: true, message: "Video uploaded successfully" };
  }

  static async bulkUploadLibraryVideo(videos, gifs, uploadDir, userId) {
    const trx = await pg.transaction()
    try {
      const videoArray = [];
    const gifArray = [];

    if (videos && videos.length > 0) {
      for (let i = 0; i < videos.length; i++) {
        const videoObject = videos[i];
        const videoNameWithoutExtension = videoObject.originalname.replace(
          ".mp4",
          ""
        );
        const videoPath = `${uploadDir}${videoObject.filename}`;
        const video = {
          user_id: userId,
          video_url: videoPath,
          title: "Title",
          keywords: videoNameWithoutExtension,
          status: 1,
        };
        videoArray.push(video);
      }
    }
    if (gifs && gifs.length > 0) {
      for (let i = 0; i < gifs.length; i++) {
        const gifObject = gifs[i];
        const gifNameWithoutExtension = gifObject.originalname.replace(
          ".gif",
          ""
        );
        const gifPath = `${uploadDir}${gifObject.filename}`;
        const gif = {
          gif_url: gifPath,
          keywords: gifNameWithoutExtension,
        };
        gifArray.push(gif);
      }
    }
    for (let i = 0; i < videoArray.length; i++) {
      for (let j = 0; j < gifArray.length; j++) {
        if (videoArray[i].keywords == gifArray[j].keywords) {
          videoArray[i].gif_url = gifArray[i].gif_url;
        }
      }
    }
    await SuperadminModel.bulkUploadLibraryVideo(videoArray, trx);
    await trx.commit()
    return { success: true, message: "Files uploaded successfully" };
    } catch (error) {
      await trx.rollback();
    }
    
  }

  static async downloadVideo(filename) {
    try {
      const twoStepsBack = path.dirname(path.dirname(__dirname));
      const videoFolder = path.join(twoStepsBack, 'src/storage/uploads');
      const filePath = path.join(videoFolder, filename);
      return filePath
    } catch (error) {
      console.log(error);

    }
  }

  static async deleteLibraryVideo(id) {
    const trx = await pg.transaction();
    try {
      const video = await SuperadminModel.getVideoById(id, trx);
      const videoPath = video[0].video_url;
      const cleanVideoPath = videoPath.trim();
      const gifPath = video[0].gif_url;
      const cleanGifPath = gifPath.trim();
      await DeleteFiles.deleteFileFromStorage(cleanVideoPath, cleanGifPath);
      await SuperadminModel.deleteLibraryVideo(id, trx);
      await trx.commit();
      return { success: true, message: "Video deleted successfully" };
    } catch (error) {
      await trx.rollback();
    }
  }

  static async unpublishVideo(id) {
    try {
      const data = {
        status: 0
      }
      await SuperadminModel.unpublishVideo(id, data);
      return { success: true, message: "Video unpublised successfully" };
    } catch (error) {

    }
  }

  static async getReferencesBySearch(keyword)  {
    const data = await SuperadminModel.getReferencesBySearch();
    const filterdData = [];
    data.forEach((video)=>{
      if (video.keywords.includes(keyword) || video.title.includes(keyword)) {
        filterdData.push(video)
      }
    })
    return filterdData
  }
 
  static async publishSuperadminUploadedVideo(id) {
    try {
      const data = {
        status: 1
      }
      await SuperadminModel.publishSuperadminUploadedVideo(id, data);
      return { success: true, message: "Video publised successfully" };
    } catch (error) {

    }
  }
  
  static async getModerationVideos() {
    return await SuperadminModel.getModerationVideos();
  }

  static async deleteModerationVideo(id) {
    const trx = await pg.transaction();
    try {
      const file = await SuperadminModel.getVideoById(id, trx);
      const filePath = file[0].video_url;
      const cleanPath = filePath.trim();
      await DeleteFiles.deleteFileFromStorage(cleanPath);
      await SuperadminModel.deleteModerationVideo(id, trx);
      await trx.commit();
      return { success: true, message: "Video deleted successfully" };
    } catch (error) {
      await trx.rollback();
    }
  }

  static async publishModerationVideo(id, title, keywords, filePath) {
    const data = {
      title: title,
      keywords: keywords,
      gif_url: filePath,
      status: 1,
    };
    await SuperadminModel.publishModerationVideo(id, data);
    return { success: true, message: "Video published successfully" };
  }

  static async rejectModerationVideo(id) {
    const data = {
      status: -1,
    };
    await SuperadminModel.rejectModerationVideo(id, data);
    return { success: true, message: "Video rejected successfully" };
  }

  static async getMessagesData() {
    const trx = await pg.transaction();
    try {
      const messages = await SuperadminModel.getMessagesData(trx);
      let usersId = [];
      messages.forEach((message) => {
        usersId.push(message.user_id);
      });
      const users = await SuperadminModel.getUsersByUserId(usersId, trx);
      const adminsId = [];
      users.forEach((user) => {
        adminsId.push({ user_id: user.id, admin_id: user.admin_id });
      });
      for (let i = 0; i < messages.length; i++) {
        for (let j = 0; j < adminsId.length; j++) {
          if (messages[i].user_id == adminsId[j].user_id) {
            messages[i].admin_id = adminsId[j].admin_id;
          }
        }
      }
      await trx.commit();
      return messages;
    } catch (error) {
      await trx.rollback();
    }
  }

  static async sendMessage(email, subject, message) {
    const trx = await pg.transaction();
    try {
      const user = await SuperadminModel.getUserByEmail(email, trx);
      if (!user[0]) {
        await trx.commit();
        return { success: true, message: "User not found" };
      }
      const emailOptions = {
        user: user[0].name,
        email: email,
        subject: subject,
        message: message,
      };
      await SendEmail.sendMessage(emailOptions);
      await trx.commit();
      return { success: true, message: "Message sent successfully" };
    } catch (error) {
      await trx.rollback();
    }
  }

  static async deleteMessage(id) {
    await SuperadminModel.deleteMessage(id);
    return { success: true, message: "Message deleted successfully" };
  }

  static async getUserPersonalInfo(id) {
    return await SuperadminModel.getUserPersonalInfo(id);
  }

  static async getUsersPersonalInfo(userId) {
    return await SuperadminModel.getUsersPersonalInfo(userId);
  }

  static async getUserPayments(userId) {
    return await SuperadminModel.getUserPayments(userId);
  }

  static async updatePaymentSuperadmin(status, expire_at, order_id) {
    const data = {
      status: status,
      expire_at: expire_at
    }
    await SuperadminModel.updatePaymentSuperadmin(data, order_id);
    return { success: true, message: "Payment updated successfully" };
  }

  static async editUserPackage(role, payment_package, id) {
    const data = {
      role: role,
      payment_package: payment_package
    }
    await SuperadminModel.editUserPackage(data, id);
    return { success: true, message: "Package updated successfully" };
  }

  static async getNotificationsData() {
    return await SuperadminModel.getNotificationsData();
  }

  static async sendNotification(title, message, user, vip, admin, status) {
    const data = {
      title: title,
      text: message,
      status: status,
      sender: "superadmin",
    };
    data.reciever_user = user ? "1" : "0";
    data.reciever_vip = vip ? "1" : "0";
    data.reciever_admin = admin ? "1" : "0";
    await SuperadminModel.sendNotification(data);
    return { success: true, message: "Notification sent successfully" };
  }

  static async deleteNotification(id) {
    await SuperadminModel.deleteNotification(id);
    return { success: true, message: "Notification deleted successfully" };
  }

  static async ipnPaymentStatus(payment_status, order_id, logs) {
    const trx = await pg.transaction();
    try {
      const logData = {
        payment: logs
      }
      await SuperadminModel.writePaymentLogs(logData, trx)
      const userPayment = await SuperadminModel.getOrderByOrderId(order_id, trx);
      const userId = userPayment[0].user_id;
      const user = await SuperadminModel.getUserById(userId, trx)
      const userEmail = user[0].email
      const emailOptions = {
        user: user[0].name,
        email: userEmail,
        payment_status: payment_status,
        order_id: order_id
      }
      if (userPayment[0].package == "users count") {
        const newPaymentData = {
          status: payment_status
        }
        if (payment_status !== "finished") {
          await SuperadminModel.updatePayment(order_id, newPaymentData, trx);
        } else {
          const usersCount = Number(userPayment[0].price)
          const availableUsersCount = Number(user[0].new_or_existing) * 10
          const new_or_existing = (usersCount + availableUsersCount) / 10
          const usersNewCountData = {
            new_or_existing: new_or_existing
          }
          await SuperadminModel.upgradeAdminAvailableUsersCount(userId, usersNewCountData, trx);
          await SuperadminModel.updatePayment(order_id, newPaymentData, trx);
        }
      } else {
        if (payment_status !== "finished") {
          const newPaymentData = {
            status: payment_status
          }
          await SuperadminModel.updatePayment(order_id, newPaymentData, trx);
        } else {
          const newUserData = {};
          const newPaymentData = {};
          if (userPayment[0].package == "enterprise") {
            newUserData.payment_package = "admin";
            newUserData.role = "admin";
            newPaymentData.expire_at = new Date();
            newPaymentData.status = payment_status
            if (userPayment[0].period == "monthly") {
              if (userPayment[0].method == "upgrade") {
                newPaymentData.expire_at.setMonth(newPaymentData.expire_at.getMonth() + 1);
              } else {
                const userAllPayments = await SuperadminModel.getUserAllPayments(userId, trx)
                const sortedPayments = userAllPayments.sort((a, b) => b.id - a.id);
                const userSecondLastPayment = sortedPayments[1];
                newPaymentData.expire_at = new Date(userSecondLastPayment.expire_at);
                newPaymentData.expire_at.setMonth(newPaymentData.expire_at.getMonth() + 1);
              }
            }
            if (userPayment[0].period == "yearly") {
              if (userPayment[0].method == "upgrade") {
                newPaymentData.expire_at.setFullYear(newPaymentData.expire_at.getFullYear() + 1);
              } else {
                const userAllPayments = await SuperadminModel.getUserAllPayments(userId, trx)
                const sortedPayments = userAllPayments.sort((a, b) => b.id - a.id);
                const userSecondLastPayment = sortedPayments[1];
                newPaymentData.expire_at = new Date(userSecondLastPayment.expire_at);
                newPaymentData.expire_at.setFullYear(newPaymentData.expire_at.getFullYear() + 1);
              }
            }
            const vipProData = {
              role: "vip",
              payment_package: "vipPro",
            };
            await SuperadminModel.updatePayment(order_id, newPaymentData, trx);
            await SuperadminModel.updateUserPackage(userId, newUserData, trx);
            await UsersModel.upgradeUsersByAdminId(userId, vipProData, trx);
          }
          if (userPayment[0].package == "vip") {

            newUserData.payment_package = "vip";
            newUserData.role = "vip";
            newPaymentData.expire_at = new Date();
            newPaymentData.status = payment_status
            if (userPayment[0].period == "monthly") {
              if (userPayment[0].method == "upgrade") {
                newPaymentData.expire_at.setMonth(newPaymentData.expire_at.getMonth() + 1);
              } else {
                const userAllPayments = await SuperadminModel.getUserAllPayments(userId, trx)
                const sortedPayments = userAllPayments.sort((a, b) => b.id - a.id);
                const userSecondLastPayment = sortedPayments[1];
                newPaymentData.expire_at = new Date(userSecondLastPayment.expire_at);
                newPaymentData.expire_at.setMonth(newPaymentData.expire_at.getMonth() + 1);
              }
            }
            if (userPayment[0].period == "yearly") {
              if (userPayment[0].method == "upgrade") {
                newPaymentData.expire_at.setFullYear(newPaymentData.expire_at.getFullYear() + 1);
              } else {
                const userAllPayments = await SuperadminModel.getUserAllPayments(userId, trx)
                const sortedPayments = userAllPayments.sort((a, b) => b.id - a.id);
                const userSecondLastPayment = sortedPayments[1];
                newPaymentData.expire_at = new Date(userSecondLastPayment.expire_at);
                newPaymentData.expire_at.setFullYear(newPaymentData.expire_at.getFullYear() + 1);
              }
            }
            await SuperadminModel.updatePayment(order_id, newPaymentData, trx);
            await SuperadminModel.updateUserPackage(userId, newUserData, trx);
          }

        }
      }
      await SendEmail.sendTransactionStatusChangeNotification(emailOptions)
      await trx.commit();
    } catch (error) {
      await trx.rollback();
    }
  }
}
