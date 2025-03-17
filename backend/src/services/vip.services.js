// Local Modules

import { VipModel } from "../models/vip.model";
import { PaymentService } from "../services/paymentService";
import { UsersModel } from "../models";
import SendEmail from "../middlewares/nodemailer";
import knex from "knex";
import knexConfigs from "../../knex.configs";
import { toLower } from "lodash";
const pg = knex(knexConfigs.development);

export class VipServices {
  
  static async getVideos(limit, offset, userId) {
    const trx = await pg.transaction();
    try {
      const videos = await VipModel.getVideos(limit, offset, trx);
      const data = [];
      videos.forEach((video) => {
        data.push({ video_id: video.id, user_id: userId });
      });
      const wishVideos = await VipModel.getVideosFromWishlist(data, trx);
      if (wishVideos.length !== 0) {
        for (let i = 0; i < videos.length; i++) {
          for (let j = 0; j < wishVideos.length; j++) {
            if (wishVideos[j].video_id == videos[i].id) {
              videos[i].wish = true;
            } else {
              videos[i].wish = false;
            }
          }
        }
      }
      await trx.commit();
      return videos;
    } catch (error) {
      await trx.rollback();
    }
  }

  static async uploadLibraryVideo(videoPath, title, keywords, userId, paymentPackage) {
    const video = {
      user_id: userId,
      video_url: videoPath,
      title: title,
      keywords: keywords,
      status: 0,
    };
    if (paymentPackage == "vipPro") {
      video.status = -2
    }
    console.log(paymentPackage, video,11111111111111111);
    
    await VipModel.uploadLibraryVideo(video);
    return { message: "Video uploaded successfully" };
  }

  static async getFileLibraryData(userId) {
    return await VipModel.getFileLibraryData(userId);
  }
  static async getWishlistData(userId) {
    const trx = await pg.transaction();
    try {
      const data = await VipModel.getWishlistData(userId, trx);
      const videosId = [];
      data.forEach((item) => {
        videosId.push(item.video_id);
      });
      const videos = await VipModel.getVideosFromId(videosId, trx);
      await trx.commit();
      return videos;
    } catch (error) {
      await trx.rollback();
    }
  }

  static async addVideoToWishlist(userId, videoId) {
    await VipModel.addVideoToWishlist(userId, videoId);
    return { message: "Video added to wishlist" };
  }

  static async removeVideoFromWishlist(userId, videoId) {
    await VipModel.removeVideoFromWishlist(userId, videoId);
    return { message: "Video removed from wishlist" };
  }

  static async getNotificationsData(userId) {
    const trx = await pg.transaction();
    try {
      const senderSuperadminNots = await VipModel.getNotificationsData(trx);
      const user = await UsersModel.getUserById(userId, trx);
      const adminId = user[0].admin_id;
      if (adminId == null) {
        await trx.commit();
        return senderSuperadminNots;
      } else {
        const senderAdminNots = await VipModel.getSenderAdminNotificationsData(
          adminId,
          trx
        );
        for (let i = 0; i < senderAdminNots.length; i++) {
          senderSuperadminNots.push(senderAdminNots[i]);
        }
      }
      const data = [];
      const userCreateDate = new Date(user[0].created_at);
      senderSuperadminNots.forEach((notification) => {
        let notificationCreateDate = new Date(notification.send_at);
        if (userCreateDate < notificationCreateDate) {
          data.push(notification);
        }
      });
      await trx.commit();
      return data;
    } catch (error) {
      await trx.rollback();
    }
  }

  static async upgrade(packageForUpgrade, period, userId, pp) {
    const trx = await pg.transaction();
    try {
      let invoice_url = "";
      const user = await UsersModel.getUserById(userId, trx);
      if (
        user[0].role == "vip" &&
        packageForUpgrade == "enterprise" &&
        pp !== "vipPro"
      ) {
        const paymentPackages = await UsersModel.getPaymentPackages(trx);
        let price = 0;
        paymentPackages.forEach((paymentPackage) => {
          if (paymentPackage.title == "Enterprise") {
            price = paymentPackage.price;
          }
        });
        if (period == "yearly") {
          price = price * 12 * 0.8;
        }
        const emailOptions = {
          email: user[0].email,
          title: "Приобретение пакета",
          subject: "Покупка платёжного пакета",
          text: "Данные платёжного пакета: ",
          user: user[0].name,
          content1:"Вы инициировали оплату для приобретения платёжного пакета.",
          paymentPackage: packageForUpgrade,
          packagePeriod: period,
          packagePrice: price,
          content2:"Об изменениях статуса транзакции Вы получите дополнительное оповещение.",
          content3: "Не отвечайте на данное письмо.",
        };
        const data = await PaymentService.createPayment(
          price,
          period,
          packageForUpgrade
        );
        data.user_id = userId;
        data.payment_id = Math.floor(
          1000000000 + Math.random() * 9000000000
        ).toString();
        data.method = "upgrade";
        data.package = "enterprise";
        data.price = data.price_amount;
        delete data.price_amount;
        data.period = period;
        data.status = "Processing";
        delete data.price_currency;
        delete data.ipn_callback_url;
        delete data.success_url;
        delete data.cancel_url;
        await UsersModel.createProcessingPayment(data, trx);
        invoice_url = data.invoice_url;
        emailOptions.invoice_url = invoice_url;
        await SendEmail.sendTransactionCreatingNotification(emailOptions);
      } else {
        await trx.commit();
        return { message: "Dont have permitions" };
      }
      await trx.commit();
      return invoice_url;
    } catch (error) {
      await trx.rollback();
    }
  }

  static async extend(packageForExtend, period, userId, pp) {
    const trx = await pg.transaction();
    try {
      let invoice_url = "";
      const user = await UsersModel.getUserById(userId, trx);
      if (pp !== "vipPro") {
        const paymentPackages = await UsersModel.getPaymentPackages(trx);
        let price = 0;
        paymentPackages.forEach((paymentPackage) => {
          if (paymentPackage.title.toLowerCase() == packageForExtend) {
            price = paymentPackage.price;
          }
        });
        if (period == "yearly") {
          price = price * 12 * 0.8;
        }
        const emailOptions = {
          email: user[0].email,
          title: "Приобретение пакета",
          subject: "Покупка платёжного пакета",
          text: "Данные платёжного пакета: ",
          user: user[0].name,
          content1:"Вы инициировали оплату для приобретения платёжного пакета.",
          paymentPackage: packageForExtend,
          packagePeriod: period,
          packagePrice: price,
          content2:"Об изменениях статуса транзакции Вы получите дополнительное оповещение.",
          content3: "Не отвечайте на данное письмо.",
        };
        const data = await PaymentService.createPayment(
          price,
          period,
          packageForExtend
        );
        data.user_id = userId;
        data.payment_id = Math.floor(
          1000000000 + Math.random() * 9000000000
        ).toString();
        data.method = "extend";
        data.package = packageForExtend;
        data.price = data.price_amount;
        delete data.price_amount;
        data.period = period;
        data.status = "Processing";
        delete data.price_currency;
        delete data.ipn_callback_url;
        delete data.success_url;
        delete data.cancel_url;
        await UsersModel.createProcessingPayment(data, trx);
        invoice_url = data.invoice_url;
        emailOptions.invoice_url = invoice_url;
        await SendEmail.sendTransactionCreatingNotification(emailOptions);
      } else {
        await trx.commit();
        return { message: "Dont have permitions" };
      }
      await trx.commit();
      return invoice_url;
    } catch (error) {
      await trx.rollback();
    }
  }

}
