import knex from "knex";
import knexConfigs from "../../knex.configs";
const pg = knex(knexConfigs.development);

export class AdminModel {
  
  static async getUsers(userId) {
    return await pg("users").select("*").where({ payment_package: "vipPro", admin_id: userId });
  }

  static async updateVipUserPaymentPackageToVipPro(data, email, trx) {
    await pg("users").update(data).where({ email: email }).transacting(trx);
  }

  static async updateUserPaymentPackageToVipPro(data, email, trx) {
    await pg("users").update(data).where({ email: email }).transacting(trx);
  }

  static async createNewUser(data, trx) {
    await pg("users").insert(data).transacting(trx);
  }

  static async blockUser(email, trx) {
    await pg("users").update({ status: "block" }).where({ email: email }).transacting(trx);
  }

  static async unblockUser(email, trx) {
    await pg("users").update({ status: "unblock" }).where({ email: email }).transacting(trx);
  }

  static async getUserByEmail(userEmail, trx) {
    return await pg("users").select("*").where({ email: userEmail }).transacting(trx);
  }

  static async deleteUser(userEmail, data, trx) {
    await pg("users").update(data).where({ email: userEmail }).transacting(trx);
  }

  static async getAllMessages(trx) {
    return await pg("messages").select("*").transacting(trx);
  }

  static async getVideosById(id, trx) {
    return await pg("videos").select("*").where({ id: id }).transacting(trx);
  }

  static async getUsersById(userId, trx) {
    return await pg("users").select("*").where({ id: userId }).transacting(trx);
  }
  
  static async deleteModerationVideoById(id, trx) {
    await pg("videos").where({ id: id }).delete().transacting(trx);
  }

  static async rejectModerationVideo(data, id, trx) {
    await pg("videos").update(data).where({ id: id }).transacting(trx);
  }

  static async getUsersByAdminId(adminId, trx) {
    return await pg("users").select("*").where({ admin_id: adminId }).transacting(trx);
  }

  static async getModerationVideosByUsersId(usersId, trx) {
    return await pg("videos").select("*").where("status", -2).whereIn("user_id", usersId).transacting(trx);
  }
  static async changeModerationVideoStatus(data, videoId, trx) {
    await pg("videos").update(data).where({ id: videoId }).transacting(trx);
  }

  static async getNotificationsData(trx) {
    return await pg("notifications").select("*").where({ reciever_admin: "1", sender: "superadmin" }).transacting(trx);
  }

  static async getAdminById(userId, trx) {
    return await pg("users").select("*").where({ id: userId }).transacting(trx);
  }

  static async sendNotification(data) {
    await pg("notifications").insert(data);
  }

  static async getSentNotificationsData(adminId) {
    return await pg("notifications").select("*").where({ sender: adminId });
  }
}
