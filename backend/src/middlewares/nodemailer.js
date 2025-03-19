import nodemailer from "nodemailer";
import config from "../config/variables.config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.GOOGLE_CONFIG.EMAIL,
    pass: config.GOOGLE_CONFIG.APP_PASSWORD,
  },
});

export default class SendEmail {
  static async sendResetCode(emailOptions) {
    const sendResetCodeOptions = {
      from: config.GOOGLE_CONFIG.EMAIL,
      to: emailOptions.email,
      subject: emailOptions.subject,
      text: emailOptions.title,
      html: `
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f6f6;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                <div style="background-color: #be9342; padding: 20px; color: #ffffff; text-align: center; font-size: 24px; font-weight: bold;">
                    ReferToonic
                </div>
                <div style="padding: 20px; color: #333; line-height: 1.6; background-color: #ffffff;">
                    <h1 style="color: #0f0f0f; font-size: 20px; margin: 0 0 10px;">Здравствуйте, ${emailOptions.user}!</h1>
                    <p style="margin: 10px 0; color: #0f0f0f;">${emailOptions.content1}</p>
                    <p style="margin: 10px 0; color: #3c3d3c;"><b>${emailOptions.text}${emailOptions.code}</b></p>
                    <p style="margin: 10px 0; color: #0f0f0f;">${emailOptions.content2}</p>
                    <p style="margin: 10px 0; color: #0f0f0f;">С Уважением,<br>Команда ReferToonic</p>
                </div>
                <div style="background-color: #2a2d2d; color: #f2e782; text-align: center; padding: 15px; font-size: 12px;">
                    <p style="margin: 0;">${emailOptions.content3}</p>
                </div>
            </div>
        </body>
      `,
    };

    try {
      await transporter.sendMail(sendResetCodeOptions);
    } catch (error) {
      console.error("Ошибка при отправке письма:", error);
    }
  }

  static async sendTransactionCreatingNotification(emailOptions) {
    const sendTransactionCreatingNotificationOptions = {
      from: config.GOOGLE_CONFIG.EMAIL,
      to: emailOptions.email,
      subject: emailOptions.subject,
      text: emailOptions.title,
      html: `
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f6f6;">
              <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);">
                  <div style="background: linear-gradient(135deg, #224259, #05141f); padding: 25px; color: #ffffff; text-align: center; font-size: 26px; font-weight: bold; letter-spacing: 1px;">
                      ReferToonic
                  </div>
                  <div style="padding: 30px; color: #333; line-height: 1.8; background-color: #ffffff;">
                      <h1 style="color: #0f0f0f; font-size: 22px; margin-bottom: 15px;">Здравствуйте, уважаемый ${emailOptions.user}!</h1>
                      <p style="margin: 10px 0; font-size: 16px; color: #555;">${emailOptions.content1}</p>
                      <div style="background: #f8f8f8; padding: 15px; border-radius: 8px; margin: 15px 0;">
                          <p style="margin: 5px 0; color: #333; font-size: 16px;"><b>${emailOptions.text}</b></p>
                          <p style="margin: 5px 0; color: #3c3d3c;"><b>Приобретаемый пакет:</b> ${emailOptions.paymentPackage}</p>
                          <p style="margin: 5px 0; color: #3c3d3c;"><b>Период:</b> ${emailOptions.packagePeriod}</p>
                          <p style="margin: 5px 0; color: #3c3d3c;"><b>Стоимость:</b> ${emailOptions.packagePrice} $</p>
                      </div>
                      <p style="margin: 10px 0; font-size: 16px; color: #555;">${emailOptions.content2}</p>
                      <div style="text-align: center; margin-top: 20px;">
                          <a href="${emailOptions.invoice_url}" style="background: #0052aa; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-size: 16px; display: inline-block; font-weight: bold;">Ссылка для оплаты</a>
                      </div>
                      <p style="margin-top: 30px; color: #777; font-size: 14px; text-align: center;">С Уважением,<br><b>Команда ReferToonic</b></p>
                  </div>
                  <div style="background-color: #05141f; color: #ffffff; text-align: center; padding: 15px; font-size: 12px;">
                      <p style="margin: 0;">${emailOptions.content3}</p>
                  </div>
              </div>
            </body>

      `,
    };
    try {
      await transporter.sendMail(sendTransactionCreatingNotificationOptions);
    } catch (error) {
      console.error("Ошибка при отправке письма:", error);
    }
  }

  static async sendMessage(emailOptions) {
    const sendMessageOptions = {
      from: config.GOOGLE_CONFIG.EMAIL,
      to: emailOptions.email,
      subject: emailOptions.subject,
      text: emailOptions.title,
      html: `
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f6f6;">
            <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);">
                <div style="background: linear-gradient(135deg, #224259, #05141f); padding: 25px; color: #ffffff; text-align: center; font-size: 26px; font-weight: bold; letter-spacing: 1px;">
                    ReferToonic
                </div>
                <div style="padding: 30px; color: #333; line-height: 1.8; background-color: #ffffff;">
                    <h1 style="color: #0f0f0f; font-size: 22px; margin-bottom: 15px;">Здравствуйте, уважаемый ${emailOptions.user}!</h1>
                    <p style="margin: 10px 0; font-size: 16px; color: #555;">${emailOptions.message}</p>
                    <p style="margin-top: 30px; color: #777; font-size: 14px; text-align: center;">С Уважением,<br><b>Команда ReferToonic</b></p>
                </div>
                <div style="background-color: #05141f; color: #ffffff; text-align: center; padding: 15px; font-size: 12px;">
                </div>
            </div>
          </body>

    `,
    };
    try {
      await transporter.sendMail(sendMessageOptions);
    } catch (error) {
      console.error("Ошибка при отправке письма:", error);
    }
  }

  static async sendTransactionStatusChangeNotification(emailOptions) {
    const sendTransactionStatusChangeNotificationOptions = {
      from: config.GOOGLE_CONFIG.EMAIL,
      to: emailOptions.email,
      subject: "Order status change",
      text: "",
      html: `
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f6f6;">
            <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);">
                <div style="background: linear-gradient(135deg, #224259, #05141f); padding: 25px; color: #ffffff; text-align: center; font-size: 26px; font-weight: bold; letter-spacing: 1px;">
                    ReferToonic
                </div>
                <div style="padding: 30px; color: #333; line-height: 1.8; background-color: #ffffff;">
                    <h1 style="color: #0f0f0f; font-size: 22px; margin-bottom: 15px;">Здравствуйте, уважаемый ${emailOptions.user}!</h1>
                    <p style="margin: 10px 0; font-size: 16px; color: #555;">Статус платежа по ордеру ${emailOptions.order_id} изменена на ${emailOptions.payment_status}</p>
                    <p style="margin: 10px 0; font-size: 16px; color: #555;">Статус платежей вы можете отслеживать в вашем личном кабинетеб в разделе Payment history.</p>
                    <p style="margin-top: 30px; color: #777; font-size: 14px; text-align: center;">С Уважением,<br><b>Команда ReferToonic</b></p>
                </div>
                <div style="background-color: #05141f; color: #ffffff; text-align: center; padding: 15px; font-size: 12px;">
                </div>
            </div>
          </body>

    `,

    };
    try {
      await transporter.sendMail(
        sendTransactionStatusChangeNotificationOptions
      );
    } catch (error) {
      console.error("Ошибка при отправке письма:", error);
    }
  }

  static async sendEmailConfirmation(emailOptions) {
    const sendEmailConfirmationOptions = {
      from: config.GOOGLE_CONFIG.EMAIL,
      to: emailOptions.email,
      subject: emailOptions.title,
      text: "",
      html: `
                     <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f6f6;">
              <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);">
                  <div style="background: linear-gradient(135deg, #224259, #05141f); padding: 25px; color: #ffffff; text-align: center; font-size: 26px; font-weight: bold; letter-spacing: 1px;">
                      ReferToonic
                  </div>
                  <div style="padding: 30px; color: #333; line-height: 1.8; background-color: #ffffff;">
                      <h1 style="color: #0f0f0f; font-size: 22px; margin-bottom: 15px;">Здравствуйте, уважаемый ${emailOptions.user}!</h1>
                      <p style="margin: 10px 0; font-size: 16px; color: #555;">${emailOptions.content1}</p>
                      <div style="background: #f8f8f8; padding: 15px; border-radius: 8px; margin: 15px 0;">
                          <p style="margin: 5px 0; color: #3c3d3c;"><b>Your code:</b> ${emailOptions.code}</p>
                          <p style="margin: 5px 0; color: #3c3d3c;">${emailOptions.content2}</p>
                      </div>
                      <p style="margin-top: 30px; color: #777; font-size: 14px; text-align: center;">С Уважением,<br><b>Команда ReferToonic</b></p>
                  </div>
                  <div style="background-color: #05141f; color: #ffffff; text-align: center; padding: 15px; font-size: 12px;">
                      <p style="margin: 0;">${emailOptions.content4}</p>
                  </div>
              </div>
            </body>

    `,
    };
    try {   
      await transporter.sendMail(sendEmailConfirmationOptions);
    } catch (error) {
      console.error("Ошибка при отправке письма:", error);
    }
  }
}
