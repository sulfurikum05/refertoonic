
   const sendResetCodeOptions = {
      from: config.GOOGLE_CONFIG.EMAIL,           
      to: email,
      subject: subject,
      text: title,
      html: `
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f6f6f6;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                <div style="background-color: #be9342; padding: 20px; color: #ffffff; text-align: center; font-size: 24px; font-weight: bold;">
                    ReferToonic
                </div>
                <div style="padding: 20px; color: #333; line-height: 1.6; background-color: #ffffff;">
                    <h1 style="color: #0f0f0f; font-size: 20px; margin: 0 0 10px;">Здравствуйте, ${user}!</h1>
                    <p style="margin: 10px 0; color: #0f0f0f;">${content1}</p>
                    <p style="margin: 10px 0; color: #3c3d3c;"><b>${text}${code}</b></p>
                    <p style="margin: 10px 0; color: #0f0f0f;">${content2}</p>
                    <p style="margin: 10px 0; color: #0f0f0f;">С Уважением,<br>Команда ReferToonic</p>
                </div>
                <div style="background-color: #2a2d2d; color: #f2e782; text-align: center; padding: 15px; font-size: 12px;">
                    <p style="margin: 0;">${content3}</p>
                </div>
            </div>
        </body>
      `
    };

     const sendTransactionCreatingNotificationOptions = {}
     const sendTransactionStatusChangeNotificationOptions = {}
     const sendEmailNotificationOptions = {}