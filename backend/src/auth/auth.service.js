import jwt from "jsonwebtoken";
import { UsersModel } from "../models";
import { CryptoUtil } from "../utils";
import knex from "knex";
import knexConfigs from "../../knex.configs";
const pg = knex(knexConfigs.development);

import config from "../config/variables.config";

const { AUTH } = config;

const {
  JWT_ACCESS_SECRET,
  // JWT_REFRESH_SECRET,
  ACCESS_TOKEN_ACTIVE_TIME,
  // REFRESH_TOKEN_ACTIVE_TIME,
} = AUTH;

// const { UnauthorizedError } = ErrorsUtil;

export default class AuthService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET);
    return accessToken;
  }

  static async validateAccessToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Токен отсутствует" });
      }
      const payload = jwt.verify(token, JWT_ACCESS_SECRET);
      if (!payload.id) {
        return res.status(401).json({ message: "ID отсутствует в payload" });
      }
      req.role = payload.role;
      req.name = payload.name;
      req.email = payload.email;
      req.userId = payload.id;
      req.pp = payload.payment_package;

      next();
    } catch (error) {
      console.error("Ошибка проверки токена:", error.message);
      return res.status(401).json({ message: "Токен недействителен" });
    }
  }

  // static validateRefreshToken(refreshToken) {
  //   try {
  //     return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  //   } catch (error) {
  //     throw new UnauthorizedError();
  //   }
  // }

  // static async refresh(token) {
  //   const user = AuthService.validateRefreshToken(token);
  //   const { accessToken, refreshToken } = AuthService.generateTokens(user);
  //   const payload = {
  //     accessToken,
  //     refreshToken,
  //     ...user
  //   };
  //   return payload;
  // }

  static async login(email, password) {
    const trx = await pg.transaction();
    try {
      const user = await UsersModel.findByEmail(email, trx);
      if (!user[0])
        return { status: false, message: "Invalid email or password!" };
      if (!CryptoUtil.isValidPassword(password, user[0].password)) {
        return { status: false, message: "Invalid email or password!" };
      }
      if (user[0].status == "block") {
        return {
          status: false,
          message:
            "User is blocked. Please contact the organization's administrator!",
        };
      }
      delete user[0].password;
      const payload = {
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
        id: user[0].id,
        payment_package: user[0].payment_package,
      };
      const userId = user[0].id;
      const userPayments = await UsersModel.getPaymentHistoryData(userId, trx);
      if (userPayments.length !== 0) {
        const maxIdPayment = userPayments
        .filter(payment => payment.package !== "users count")
        .reduce((max, payment) => (payment.id > max.id ? payment : max), { id: -Infinity });
        const expireDateStr = maxIdPayment.expire_at;
        const expireDate = new Date(expireDateStr);
        const nowDate = new Date();
        if (expireDate > nowDate) {
          if (user[0].role === "vip") {
            payload.page = "./vip/vip.dashboard.html";
          }
          if (user[0].role === "admin") {
            payload.page = "./admin/admin.dashboard.html";
          }
        } else {
          if (user[0].role === "admin") {
            const adminId = user[0].id;
            const data = {
              role: "user",
              payment_package: "free",
            };
            await UsersModel.resetUsersByAdminId(adminId, data, trx);
          }
          const data = {
            role: "user",
            payment_package: "free",
          };
          await UsersModel.resetPackage(userId, data, trx);
          payload.role = "user";
          payload.payment_package = "free";
          payload.page = "./user/user.dashboard.html";
        }
      } else {
        if (user[0].role === "user") {
          if (user[0].admin_id == null) {
            payload.page = "./user/user.dashboard.html";
          }else{
            const adminId = user[0].admin_id
            const admin =  await UsersModel.getAdminByAdminId(adminId, trx);
            if (admin[0].role == "admin") {
              const userNewData = {
                role: "vip",
                payment_package: "vipPro"
              }   
              await UsersModel.updateUserPackage(userId, userNewData, trx);
              payload.role = "vip"
              payload.payment_package = "vipPro"
              payload.page = "./vip/vip.dashboard.html";
            }else{
              payload.page = "./user/user.dashboard.html";
            }
          }
        }
        if (user[0].role === "vip") {
          payload.page = "./vip/vip.dashboard.html";
        }
        if (user[0].role === "superadmin") {
          payload.page = "./superadmin/dashboardManagement.html";
        }
      }
      const accessToken = AuthService.generateTokens({ ...payload });
      payload.accessToken = accessToken;
      payload.status = true;
      await trx.commit();
      return payload;
    } catch (error) {
      await trx.rollback();
    }
  }
}
