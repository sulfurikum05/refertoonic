

import { UsersModel } from "../models";
import { PaymentService } from "../services/paymentService";
import { CryptoUtil } from '../utils';
import SendEmail from "../middlewares/nodemailer";
import bcrypt from 'bcryptjs'
import dotenv from "dotenv"
import knex from "knex";
import knexConfigs from "../../knex.configs";
const pg = knex(knexConfigs.development);
dotenv.config()




export default class UsersServices {
    


  static async register(name, surname, email, password) {
    const trx = await pg.transaction();
try {
    const dataMessage = {}
    const user = await UsersModel.getUserByEmail(email, trx)  
    
    if (user.length == 0) {
      const hashedPassword = CryptoUtil.createHash(password)
      const data = {
        name: name,
        surname: surname,
        email: email,
        password: hashedPassword,
        role: "user",
        payment_package: "free",
        new_or_existing: 1,
        status: `unblock`,
        created_at: new Date().toISOString(),
      }
      await UsersModel.createUser(data, trx) 
      const newUser = await UsersModel.getUserByEmail(email, trx) 
      const userProfileData = {
        user_id: newUser[0].id,
        picture: ".../frontend/icons/avatar.jpg",
        name: newUser[0].name,
        surname: newUser[0].surname,
        phone: "Set your phone number",
        address: "Set your address",
        email: newUser[0].email,
        website: "Set your website",
        birthday: "Set your birthday",
        gender: "Set your gender",
        about: "Tell us about yourself",
      }
      await UsersModel.createUserProfileData(userProfileData, trx)  
      dataMessage.message = "User create successfully!"
      await trx.commit();
      return dataMessage
    }else{
      dataMessage.message = "User is already exist!"
      await trx.commit();
      return dataMessage
    }
    } catch (error) {
      await trx.rollback();
    }
  }

  static async getResetCode(email) {
    const trx = await pg.transaction();
  try {
    const emailOptions = {
      code: Math.floor(100000 + Math.random() * 900000),
      title : "Восстановление пароля",
      subject : "",
      text : "Ваш проверочный код: ",
      user : "уважаемый пользователь",
      content1 : "Вы пытаетесь восстановить свой пароль.",
      content2 : "Если вы не инициировали данное действие, возможно вас хотят взломать. Никому не сообщайте данный код и обратитесь в службу поддержки.",
      content3 : "Больше не забывайте свой пароль."
    }

      const userData = await UsersModel.getUserByEmail(email, trx) 

      if (userData.length !== 0) {
        await UsersModel.updatePassword(email, code, trx)
        await SendEmail.sendResetCode(emailOptions)
      }
      await trx.commit();
      return {message: "Code successfully sent to your email"}
  } catch (error) {
    await trx.rollback();
  }
      

    }
  
    static async resetPassword(code, newPassword) {
      const password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10), null)
      await UsersModel.resetPassword(code, password)   
      return {message: "Password reset successfully"}
    }
    static async sendUnauthMessage(email, name, text) {
      const data = {
        email: email,
        name: name,
        subject: "UnAuth",
        text: text
      }
      await UsersModel.sendUnauthMessage(data)  
      return {message: "Message sent successfully"}      
    }
    static async getDashboard() {
      const trx = await pg.transaction();
      try {
        const texts = await UsersModel.getDashboardTexts(trx)
        const video = await UsersModel.getDashboardSliderVideo(trx)
        const packages = await UsersModel.getDashboardPaymentPackages(trx)
        const team = await UsersModel.getDashboardTeam(trx)
        await trx.commit();
        return {
          texts: texts, 
          video: video, 
          packages: packages, 
          team: team
          }
      } catch (error) {
        await trx.rollback();
      }
    }

    
    static async saveProfileData(newData, userId) {
      const isAllUndefined = Object.values(newData).every(value => value === undefined);
      if (isAllUndefined) {
        return {message: "Заполните хотя бы одно поле"}  
      }else{
        await UsersModel.saveProfileData(newData, userId)        
        return {message: "Data saved successfully"}   
      }

    }

    static async changePassword(oldPassword, newPassword, newPasswordConfirm, userId) {
      const trx = await pg.transaction();
      try {
        const dataMessage = {}
        const user = await UsersModel.getUserById(userId, trx)
      if (!CryptoUtil.isValidPassword(oldPassword, user[0].password)) {
         dataMessage.message = "Wrong password"
         await trx.commit();
         return dataMessage
      }
      if (newPassword !== newPasswordConfirm) {
         dataMessage.message = "Passwords are not the same"
         await trx.commit();
         return dataMessage
      }
      const hashedPassword = CryptoUtil.createHash(newPassword)
      await UsersModel.changePassword(hashedPassword, userId, trx)  
      dataMessage.message = "Password changed successfully"
      await trx.commit();
      return dataMessage
      } catch (error) {
        await trx.rollback();
      }
            
      
    }
    static async sendHelpMessage(userId, userName, userEmail, subject, message) {
      const data = {
        user_id: userId,
        email: userEmail,
        name: userName,
        subject: subject,
        text: message
      }
      await UsersModel.sendHelpMessage(data)        
      return {message: "Message sent successfully"}  
    }
    static async getSentMessages(id) {
      return await UsersModel.getSentMessages(id)       
    }

    static async getPaymentPackages(role, pp) {
      const trx = await pg.transaction();
      try {
        const ppData = await UsersModel.getPaymentPackages(trx) 
      ppData.sort((a, b) => a.id - b.id);

          if (role == "user") {
            ppData[0].status = "Current"
            ppData[1].status = "Upgrade"
            ppData[2].status = "Upgrade"
            ppData[0].color = "color"
          }
          if (role == "vip" && pp !== "vipPro") {
            ppData[0].status = "hide"
            ppData[1].status = "Current"
            ppData[2].status = "Upgrade"
            ppData[1].color = "color"
            
          }
          if (role == "vip" && pp == "vipPro") {
            ppData[0].status = "hide"
            ppData[1].status = "hide"
            ppData[2].status = "hide"
            ppData[1].color = "color"
          }
          if (role == "admin") {
            ppData[0].status = "hide"
            ppData[1].status = "hide"
            ppData[2].status = "Current"
            ppData[2].color = "color"
          }
          await trx.commit();
          return ppData
      } catch (error) {
        await trx.rollback();
      }   
    }

    static async getVideos() {
      const data = await UsersModel.getVideos()   
      data.forEach(item => {
        delete item.upload_at
        delete item.user_id
      })
      return data
    }


    static async getVideosBySearch(role, keyword) {
      const data = await UsersModel.getVideosBySearch(role, keyword)   
      const filterdData = []
      const userDataThreeItems = []
      if (role == "user") {
        for (let i = 0; i < data.length; i++) {
          if (data[i].keywords.includes(keyword)) {
            filterdData.push(data[i])
          }
        }
        if (filterdData.length > 3) {
          userDataThreeItems.push(filterdData[0])
          userDataThreeItems.push(filterdData[1])
          userDataThreeItems.push(filterdData[2])
          return userDataThreeItems
        }else{
          return filterdData
        }
      }else{
        for (let i = 0; i < data.length; i++) {
          if (data[i].keywords.includes(keyword)) {
            filterdData.push(data[i])
          }
        }
        return filterdData
      }
    }

    static async getNotificationsData(userId) {
      const trx = await pg.transaction();
      try {
        const user = await UsersModel.getUserById(userId, trx)
       const notifications = await UsersModel.getNotificationsData(trx)  
      const data = []
      const userCreateDate = new Date(user[0].created_at);
      notifications.forEach((notification)=>{
        let notificationCreateDate = new Date(notification.send_at)
        if (userCreateDate < notificationCreateDate) {
          data.push(notification)
        }
      })
        await trx.commit();
        return data
      } catch (error) {
        await trx.rollback();
      }
       
    }

    static async upgrade(packageForUpgrade, period, userId) {
      const trx = await pg.transaction();
      try {
        let invoice_url = ''
        const user = await UsersModel.getUserById(userId, trx)

      if (user[0].role == "user" && packageForUpgrade == "vip") {
        const paymentPackages = await UsersModel.getPaymentPackages(trx)
        let price = 0
        paymentPackages.forEach((paymentPackage)=>{
          if (paymentPackage.title == "Vip") {
            price = paymentPackage.price
          }
        })
        if (period == "yearly") {
          price = price * 12 * 0.8
        }
        const emailOptions = {
          email: user[0].email,
          title : "Приобретение пакета",
          subject : "Покупка платёжного пакета",
          text : "Данные платёжного пакета: ",
          user : user[0].name,
          content1 : "Вы инициировали оплату для приобретения платёжного пакета.",
          paymentPackage : packageForUpgrade,
          packagePeriod : period,
          packagePrice : price,
          content2 : "Об изменениях статуса транзакции Вы получите дополнительное оповещение.",
          content3 : "Не отвечайте на данное письмо.",
        }

        const data = await PaymentService.createPayment(price, period, packageForUpgrade)
        data.user_id = userId
        data.payment_id = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        data.method = "upgrade"
        data.package = "vip"
        data.price = data.price_amount
        delete data.price_amount
        data.period = period
        data.status = "Processing"
        delete data.price_currency
        delete data.ipn_callback_url
        delete data.success_url
        delete data.cancel_url
        await UsersModel.createProcessingPayment(data, trx)
        invoice_url = data.invoice_url
        emailOptions.invoice_url = invoice_url
        await SendEmail.sendTransactionCreatingNotification(emailOptions)
      } 



      if (user[0].role == "user" && packageForUpgrade == "enterprise") {
        const paymentPackages = await UsersModel.getPaymentPackages(trx)
        let price = 0
        paymentPackages.forEach((paymentPackage)=>{
          if (paymentPackage.title == "Enterprise") {
            price = paymentPackage.price
          }
        })
        if (period == "yearly") {
          price = price * 12 * 0.8
        }
        const emailOptions = {
          email: user[0].email,
          title : "Приобретение пакета",
          subject : "Покупка платёжного пакета",
          text : "Данные платёжного пакета: ",
          user : user[0].name,
          content1 : "Вы инициировали оплату для приобретения платёжного пакета.",
          paymentPackage : packageForUpgrade,
          packagePeriod : period,
          packagePrice : price,
          content2 : "Об изменениях статуса транзакции Вы получите дополнительное оповещение.",
          content3 : "Не отвечайте на данное письмо.",
        }


        const data = await PaymentService.createPayment(price, period, packageForUpgrade)
        
        data.user_id = userId
        data.payment_id = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        data.method = "upgrade"
        data.package = "enterprise"
        data.price = data.price_amount
        delete data.price_amount
        data.period = period
        data.status = "Processing"
        delete data.price_currency
        delete data.ipn_callback_url
        delete data.success_url
        delete data.cancel_url
        await UsersModel.createProcessingPayment(data, trx)
        invoice_url = data.invoice_url
        emailOptions.invoice_url = invoice_url
        await SendEmail.sendTransactionCreatingNotification(emailOptions)
      }
      
        await trx.commit();
        return invoice_url
      } catch (error) {
        await trx.rollback();
      }
      
    }
        
    
    
    static async getPaymentHistoryData(userId) {
      const trx = await pg.transaction();
      try {
        const data =  await UsersModel.getPaymentHistoryData(userId, trx)
        await trx.commit();
        return data 
      } catch (error) {
        await trx.rollback();
      }
       
    }
    
}

