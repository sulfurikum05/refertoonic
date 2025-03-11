import config from '../config/variables.config';
const { PAYMENTS } = config;

const {PAYMENTS_API_KEY} = PAYMENTS;

  const express = require('express');
  const axios = require('axios');
  const app = express();
  app.use(express.json());



export class PaymentService {
    static async createPayment(price, period, packageForUpgrade) {
    const descriptoin0 = period + " " + packageForUpgrade

    const descriptoin =  descriptoin0.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    const apiKey = PAYMENTS_API_KEY;

    const url = 'https://api.nowpayments.io/v1/invoice';

    const orderId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const payload = {
        price_amount: Number(price),  // Сумма в основной валюте (например, 1000 USD)
        price_currency: 'usd',  // Валюта, в которой платит клиент
        order_id: orderId,  // Уникальный ID вашего заказа
        order_description: descriptoin,  // Описание заказа
        ipn_callback_url: 'https://nowpayments.io',  // URL для IPN (уведомлений о транзакциях)
        success_url: 'https://nowpayments.io',  // URL, на который клиент перейдет после успешной оплаты
        cancel_url: 'https://nowpayments.io'   // URL, на который клиент перейдет, если отменит оплату
    };

    try {  
        const response = await  axios.post(url, payload, {
          headers: {
            'x-api-key': apiKey,  // Ваш API-ключ
            'Content-Type': 'application/json'
          }
        })
        const data = {
            ...payload
        }
        data.invoice_url =  response.data.invoice_url
        return  data
    } catch (error) {
        console.error('Error while creating payment:', error);
        throw error;
    }


    }
}