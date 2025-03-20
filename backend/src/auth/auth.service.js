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
  ACCESS_TOKEN_ACTIVE_TIME,
} = AUTH;

export default class AuthService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_ACTIVE_TIME });
    return accessToken;
  }

  static async validateAccessToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token is missing" });
      }
      const payload = jwt.verify(token, JWT_ACCESS_SECRET);
      if (!payload.id) {
        return res.status(401).json({ message: "ID is missing in payload" });
      }
      req.role = payload.role;
      req.name = payload.name;
      req.email = payload.email;
      req.userId = payload.id;
      req.pp = payload.payment_package;

      next();
    } catch (error) {
      console.error("Token verification error", error.message);
      return res.status(401).json({ message: "Token is invalid" });
    }
  }

  static async login(email, password) {
    
    const trx = await pg.transaction();
    try {
      const user = await UsersModel.findByEmail(email, trx);
      if (!user[0]) return { status: false, message: "Invalid email or password!" };
      if (!CryptoUtil.isValidPassword(password, user[0].password)) return { status: false, message: "Invalid email or password!" };
      if (user[0].status == "block") return { status: false, message: "User is blocked. Please contact the organization's administrator!" };
      if (user[0].status !== "block" && user[0].status !== "unblock") return { status: false, message: "Please, confirm your email!" };
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

      if (user[0].role == "user") {
        // dont have payment
        if (userPayments.length == 0) {
          const adminId = user[0].admin_id
          if (adminId == null) {
            payload.page = "./user/user.dashboard.html";
          }
          const admin = await UsersModel.getAdminByAdminId(adminId, trx);
          if (admin.length !== 0) {
             if (admin[0].role == "admin") {
            payload.role = "vip"
            payload.payment_package = "vipPro"
            payload.page = "./vip/vip.dashboard.html";
            const userNewData = {
              role: "vip",
              payment_package: "vipPro"
            }
            await UsersModel.updateUserPackage(userId, userNewData, trx);
          } else {
            payload.page = "./user/user.dashboard.html";
          }
          }
        }
        // have exp payment
        if (userPayments.length !== 0) {
          const maxIdPayment = userPayments
            .filter(payment => payment.package !== "users count")
            .reduce((max, payment) => (payment.id > max.id ? payment : max), { id: -Infinity });
          const expireDateStr = maxIdPayment.expire_at;
          const expireDate = new Date(expireDateStr);
          const nowDate = new Date();
          if (expireDate < nowDate) {
            const adminId = user[0].admin_id
            if (adminId == null) {
              payload.page = "./user/user.dashboard.html";
            }
            const admin = await UsersModel.getAdminByAdminId(adminId, trx);
            if (admin.length !== 0){
              if (admin[0].role == "admin") {
                payload.role = "vip"
                payload.payment_package = "vipPro"
                payload.page = "./vip/vip.dashboard.html";
                const userNewData = {
                  role: "vip",
                  payment_package: "vipPro"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              } else {
                payload.page = "./user/user.dashboard.html";
              }
            }

          }
        }
        // have no exp payment
        if (userPayments.length !== 0) {
          const maxIdPayment = userPayments
            .filter(payment => payment.package !== "users count")
            .reduce((max, payment) => (payment.id > max.id ? payment : max), { id: -Infinity });
          const expireDateStr = maxIdPayment.expire_at;
          const expireDate = new Date(expireDateStr);
          const nowDate = new Date();
          if (expireDate > nowDate) {
            const adminId = user[0].admin_id
            if (adminId == null) {
              if (maxIdPayment.package == "vip") {
                payload.role = "vip"
                payload.payment_package = "vip"
                payload.page = "./vip/vip.dashboard.html";
                const userNewData = {
                  role: "vip",
                  payment_package: "vip"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              }
              if (maxIdPayment.package == "enterprise") {
                payload.role = "admin"
                payload.payment_package = "admin"
                payload.page = "./admin/admin.dashboard.html";
                const userNewData = {
                  role: "admin",
                  payment_package: "admin"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              }
            }
            const admin = await UsersModel.getAdminByAdminId(adminId, trx);
            if (admin.length !== 0){
                if (admin[0].role == "admin" && maxIdPayment.package !== "enterprise") {
                payload.role = "vip"
                payload.payment_package = "vipPro"
                payload.page = "./vip/vip.dashboard.html";
                const userNewData = {
                  role: "vip",
                  payment_package: "vipPro"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              } else if (admin[0].role == "admin" && maxIdPayment.package == "enterprise") {
                payload.role = "admin"
                payload.payment_package = "admin"
                payload.page = "./admin/admin.dashboard.html";
                const userNewData = {
                  role: "admin",
                  payment_package: "admin"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              } else {
                if (maxIdPayment.package == "vip") {
                  payload.role = "vip"
                  payload.payment_package = "vip"
                  payload.page = "./vip/vip.dashboard.html";
                  const userNewData = {
                    role: "vip",
                    payment_package: "vip"
                  }
                  await UsersModel.updateUserPackage(userId, userNewData, trx);
                }
                if (maxIdPayment.package == "enterprise") {
                  payload.role = "admin"
                  payload.payment_package = "admin"
                  payload.page = "./admin/admin.dashboard.html";
                  const userNewData = {
                    role: "admin",
                    payment_package: "admin"
                  }
                  await UsersModel.updateUserPackage(userId, userNewData, trx);
                }

              }
            }
            
          }
        }
      }

      if (user[0].role == "vip" && user[0].payment_package == "vip") {
        // have exp payment
        if (userPayments.length !== 0) {
          const maxIdPayment = userPayments
            .filter(payment => payment.package !== "users count")
            .reduce((max, payment) => (payment.id > max.id ? payment : max), { id: -Infinity });
          const expireDateStr = maxIdPayment.expire_at;
          const expireDate = new Date(expireDateStr);
          const nowDate = new Date();
          if (expireDate < nowDate) {
            const adminId = user[0].admin_id
            if (adminId == null) {
              payload.role = "user"
              payload.payment_package = "free"
              payload.page = "./user/user.dashboard.html";
              const userNewData = {
                role: "user",
                payment_package: "free"
              }
              await UsersModel.updateUserPackage(userId, userNewData, trx);
            }
            const admin = await UsersModel.getAdminByAdminId(adminId, trx);
            if (admin.length !== 0) {
              if (admin[0].role == "admin") {
                payload.role = "vip"
                payload.payment_package = "vipPro"
                payload.page = "./vip/vip.dashboard.html";
                const userNewData = {
                  role: "vip",
                  payment_package: "vipPro"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              } else {
                payload.role = "user"
                payload.payment_package = "free"
                payload.page = "./user/user.dashboard.html";
                const userNewData = {
                  role: "user",
                  payment_package: "free"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              }
            }
            
          }
        }
        // have no exp payment
        if (userPayments.length !== 0) {
          const maxIdPayment = userPayments
            .filter(payment => payment.package !== "users count")
            .reduce((max, payment) => (payment.id > max.id ? payment : max), { id: -Infinity });
          const expireDateStr = maxIdPayment.expire_at;
          const expireDate = new Date(expireDateStr);
          const nowDate = new Date();
          if (expireDate > nowDate) {
            const adminId = user[0].admin_id
            if (adminId == null) {
              if (maxIdPayment.package == "vip") {
                payload.page = "./vip/vip.dashboard.html";
              }
              if (maxIdPayment.package == "enterprise") {
                payload.role = "admin"
                payload.payment_package = "admin"
                payload.page = "./admin/admin.dashboard.html";
                const userNewData = {
                  role: "admin",
                  payment_package: "admin"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              }
            }
            const admin = await UsersModel.getAdminByAdminId(adminId, trx);
            if (admin.length !== 0) {
              if (admin[0].role == "admin" && maxIdPayment.package !== "enterprise") {
                payload.role = "vip"
                payload.payment_package = "vipPro"
                payload.page = "./vip/vip.dashboard.html";
                const userNewData = {
                  role: "vip",
                  payment_package: "vipPro"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              } else if (admin[0].role == "admin" && maxIdPayment.package == "enterprise") {
                payload.role = "admin"
                payload.payment_package = "admin"
                payload.page = "./admin/admin.dashboard.html";
                const userNewData = {
                  role: "admin",
                  payment_package: "admin"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              } else {
                if (maxIdPayment.package == "vip") {
                  payload.page = "./vip/vip.dashboard.html";
                }
                if (maxIdPayment.package == "enterprise") {
                  payload.role = "admin"
                  payload.payment_package = "admin"
                  payload.page = "./admin/admin.dashboard.html";
                  const userNewData = {
                    role: "admin",
                    payment_package: "admin"
                  }
                  await UsersModel.updateUserPackage(userId, userNewData, trx);
                }
  
              }
            }

          }
        }

      }

      if (user[0].role == "vip" && user[0].payment_package == "vipPro") {
        // dont have payment
        if (userPayments.length == 0) {
          const adminId = user[0].admin_id
          const admin = await UsersModel.getAdminByAdminId(adminId, trx);
          if (admin.length !== 0) {
            if (admin[0].role == "admin") {
              payload.page = "./vip/vip.dashboard.html";
            } else {
              payload.role = "user"
              payload.payment_package = "free"
              payload.page = "./user/user.dashboard.html";
              const userNewData = {
                role: "user",
                payment_package: "free"
              }
              await UsersModel.updateUserPackage(userId, userNewData, trx);
            }
          }

        }
        // have exp payment
        if (userPayments.length !== 0) {
          const maxIdPayment = userPayments
            .filter(payment => payment.package !== "users count")
            .reduce((max, payment) => (payment.id > max.id ? payment : max), { id: -Infinity });
          const expireDateStr = maxIdPayment.expire_at;
          const expireDate = new Date(expireDateStr);
          const nowDate = new Date();
          if (expireDate < nowDate) {
            const adminId = user[0].admin_id
            const admin = await UsersModel.getAdminByAdminId(adminId, trx);
            if (admin.length !== 0) {
              if (admin[0].role == "admin") {
                payload.page = "./vip/vip.dashboard.html";
              } else {
                payload.role = "user"
                payload.payment_package = "free"
                payload.page = "./user/user.dashboard.html";
                const userNewData = {
                  role: "user",
                  payment_package: "free"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              }
            }

          }
        }
        // have no exp payment
        if (userPayments.length !== 0) {
          const maxIdPayment = userPayments
            .filter(payment => payment.package !== "users count")
            .reduce((max, payment) => (payment.id > max.id ? payment : max), { id: -Infinity });
          const expireDateStr = maxIdPayment.expire_at;
          const expireDate = new Date(expireDateStr);
          const nowDate = new Date();
          if (expireDate > nowDate) {
            const adminId = user[0].admin_id
            const admin = await UsersModel.getAdminByAdminId(adminId, trx);
            if (admin.length !== 0) {
              if (admin[0].role == "admin" && maxIdPayment.package !== "enterprise") {
                payload.page = "./vip/vip.dashboard.html";
              } else if (admin[0].role == "admin" && maxIdPayment.package == "enterprise") {
                payload.role = "admin"
                payload.payment_package = "admin"
                payload.page = "./admin/admin.dashboard.html";
                const userNewData = {
                  role: "admin",
                  payment_package: "admin"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              } else {
                if (maxIdPayment.package == "vip") {
                  payload.role = "vip"
                  payload.payment_package = "vip"
                  payload.page = "./vip/vip.dashboard.html";
                  const userNewData = {
                    role: "vip",
                    payment_package: "vip"
                  }
                  await UsersModel.updateUserPackage(userId, userNewData, trx);
                }
                if (maxIdPayment.package == "enterprise") {
                  payload.role = "admin"
                  payload.payment_package = "admin"
                  payload.page = "./admin/admin.dashboard.html";
                  const userNewData = {
                    role: "admin",
                    payment_package: "admin"
                  }
                  await UsersModel.updateUserPackage(userId, userNewData, trx);
                }
  
              }
            }

          }
        }
      }

      if (user[0].role == "admin") {
        // have exp payment
        if (userPayments.length !== 0) {
          const maxIdPayment = userPayments
            .filter(payment => payment.package !== "users count")
            .reduce((max, payment) => (payment.id > max.id ? payment : max), { id: -Infinity });
          const expireDateStr = maxIdPayment.expire_at;
          const expireDate = new Date(expireDateStr);
          const nowDate = new Date();
          if (expireDate < nowDate) {
            const adminId = user[0].admin_id
            if (adminId == null) {
              payload.role = "user"
              payload.payment_package = "free"
              payload.page = "./user/user.dashboard.html";
              const userNewData = {
                role: "user",
                payment_package: "free"
              }
              await UsersModel.updateUserPackage(userId, userNewData, trx);
            }
            const admin = await UsersModel.getAdminByAdminId(adminId, trx);
            if (admin.length !== 0) {
              if (admin[0].role == "admin") {
                payload.role = "vip"
                payload.payment_package = "vipPro"
                payload.page = "./vip/vip.dashboard.html";
                const userNewData = {
                  role: "vip",
                  payment_package: "vipPro"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              } else {
                payload.role = "user"
                payload.payment_package = "free"
                payload.page = "./user/user.dashboard.html";
                const userNewData = {
                  role: "user",
                  payment_package: "free"
                }
                await UsersModel.updateUserPackage(userId, userNewData, trx);
              }
            }

          }
        }
        // have no exp payment
        if (userPayments.length !== 0) {
          const maxIdPayment = userPayments
            .filter(payment => payment.package !== "users count")
            .reduce((max, payment) => (payment.id > max.id ? payment : max), { id: -Infinity });
          const expireDateStr = maxIdPayment.expire_at;
          const expireDate = new Date(expireDateStr);
          const nowDate = new Date();
          if (expireDate > nowDate) {
            payload.page = "./admin/admin.dashboard.html";
          }
        }
      }
      if (user[0].role == "superadmin") {
        payload.page = "./superadmin/superadmin.dashboard.html";
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
