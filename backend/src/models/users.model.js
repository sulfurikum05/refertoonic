import knex from "knex";
import knexConfigs from "../../knex.configs";
const pg = knex(knexConfigs.development);

class UsersModel {
  
  static async getUserByEmail(email, trx) {
    return await pg("users")
      .select("*")
      .where({ email: email })
      .transacting(trx);
  }

  static async createUser(data, trx) {
    await pg("users").insert(data).transacting(trx);
  }

  static async createUserProfileData(userProfileData, trx) {
    await pg("users_profile").insert(userProfileData).transacting(trx);
  }

  static async findByEmail(email, trx) {
    return await pg("users")
      .select("*")
      .where({ email: email })
      .transacting(trx);
  }
  
  static async updatePassword(email, code, trx) {
    await pg("users")
      .update({ password: code })
      .where({ email: email })
      .transacting(trx);
  }

  static async resetPassword(code, newPassword) {
    await pg("users")
      .update({ password: newPassword })
      .where({ password: code });
  }

  static async sendUnauthMessage(data) {
    await pg("messages").insert(data);
  }

  static async getDashboardTexts(trx) {
    return await pg("dashboard_texts").select("*").transacting(trx);
  }

  static async getDashboardSliderVideo(trx) {
    return await pg("slider_videos").select("*").transacting(trx);
  }

  static async getDashboardPaymentPackages(trx) {
    return await pg("payment_packages").select("*").transacting(trx);
  }

  static async getDashboardTeam(trx) {
    return await pg("team").select("*").transacting(trx);
  }

  static async saveProfileData(newData, userId) {
    await pg("users_profile").update(newData).where({ user_id: userId });
  }

  static async changePassword(hashedPassword, userId, trx) {
    await pg("users")
      .update({ password: hashedPassword })
      .where({ id: userId })
      .transacting(trx);
  }

  static async sendHelpMessage(data) {
    await pg("messages").insert(data);
  }

  static async getSentMessages(id) {
    return await pg("messages").select("*").where({ user_id: id });
  }

  static async getPaymentPackages(trx) {
    return await pg("payment_packages").select("*").transacting(trx);
  }

  static async getVideos() {
    return await pg("videos")
      .select("*")
      .whereIn("id", [1,2,3,4,5,6,7,8,9,10]);
  }

  static async getVideosBySearch() {
    return await pg("videos").select("*");
  }

  static async getNotificationsData(trx) {
    return await pg("notifications")
      .select("*")
      .where({ reciever_user: "1" })
      .transacting(trx);
  }

  static async getUserById(userId, trx) {
    return await pg("users").select("*").where({ id: userId }).transacting(trx);
  }

  static async createProcessingPayment(data, trx) {
    await pg("payments").insert(data).transacting(trx);
  }

  static async getPaymentHistoryData(userId, trx) {
    return await pg("payments")
      .select("*")
      .where({ user_id: userId })
      .transacting(trx);
  }

  static async resetUsersByAdminId(adminId, data, trx) {
    await pg("users")
      .where({ admin_id: adminId })
      .update(data)
      .transacting(trx);
  }

  static async resetPackage(userId, data, trx) {
    await pg("users")
      .update(data)
      .where({ id: userId })
      .transacting(trx);
  }

  static async upgradeUsersByAdminId(userId, vipProData, trx) {
    await pg("users")
      .update(vipProData)
      .where({ admin_id: userId })
      .transacting(trx);
  }
}

export default UsersModel;
