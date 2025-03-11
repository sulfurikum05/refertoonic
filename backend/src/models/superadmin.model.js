import knex from "knex";
import knexConfigs from "../../knex.configs";
const pg = knex(knexConfigs.development);


export class SuperadminModel {

      static async getUsers() {
        return await pg("users").select("*")
      }
      static async getSliderVideosData () {
        return await pg("slider_videos").select("*")
      }
      static async getDashboardTextsData () {
        return await pg("dashboard_texts").select("*")
      }
      static async getTeamData () {
        return await pg("team").select("*")
      }
      static async getPaymentPackagesData () {
        return await pg("payment_packages").select("*")
      }
      static async uploadSliderVideo(video) {
        await pg("slider_videos").insert(video);
      }
      static async updateText(newData, id) {
        await pg("dashboard_texts").update(newData).where({id: id});
      }
      static async getSliderVideoById(id, trx) {
        return await pg("slider_videos").select("*").where({ id: id }).transacting(trx);
      }
      static async deleteSliderVideo(id, trx) {
        await pg("slider_videos").where({ id: id }).delete().transacting(trx);
      }
      static async createPaymentPackage(data) {
        await pg("payment_packages").insert(data)
      }
      static async updateTeam(data, id) {
        await pg("team").update(data).where({id: id});
      }
      static async updatePaymentPackage(newData, id) {
        await pg("payment_packages").update(newData).where({id: id});
      }
      static async deletePaymentPackage(id) {
        await pg("payment_packages").where({ id: id }).delete();
      }
      static async getPaymentHistoryData () {
        return await pg("payments").select("*")
      }
      static async getfileLibraryData () {
        return await pg("videos").select("*").where("status", 1)
      }
      static async uploadLibraryVideo(video) {
        await pg("videos").insert(video);
      }
      static async bulkUploadLibraryVideo(dataArray)  {
        await pg("videos").insert(dataArray);
      }
      static async deleteLibraryVideo(id, trx) {
        await pg("videos").where({ id: id }).delete().transacting(trx);
      }
      static async getVideoById(id, trx) {
        return await pg("videos").select("*").where({ id: id }).transacting(trx);
      }
      static async deleteModerationVideo(id, trx) {
        await pg("videos").where({ id: id }).delete().transacting(trx);
      }
      static async publishModerationVideo(id, data) {
        await pg("videos").update(data).where({ id: id });
      }
      static async rejectModerationVideo(id, data) {
        await pg("videos").update(data).where({ id: id });
      }
      static async getModerationVideos() {
        return await pg("videos").select("*").whereIn("status", [0, -1])
      }
      static async getMessagesData (trx) {
        return await pg("messages").select("*").transacting(trx);
      }
      static async getUsersByUserId(usersId, trx) {
        return await pg("users").select("*").whereIn('id', usersId).transacting(trx);
      }
      static async deleteMessage(id) {
        await pg("messages").where({ id: id }).delete();
      }
      static async getUserPersonalInfo (id) {
        return await pg("users_profile").select("*").where({user_id: id})
      }
      static async getUsersPersonalInfo (userId) {
        return await pg("users_profile").select("*").where({user_id: userId})
      }
      static async getNotificationsData() {
        return await pg("notifications").select('*').where({sender: "superadmin"})
      }
      static async sendNotification (data) {
        await pg("notifications").insert(data)
      }
      static async deleteNotification (id) {
        await pg("notifications").where({id: id}).delete();
      }
      static async getOrderByOrderId(order_id, trx) {
        return await pg("payments").select("*").where({order_id: order_id}).transacting(trx);
      }
      static async  updateUserPackage(userId, newData, trx) {
        await pg("payments").update(newData).where({user_id: userId}).transacting(trx);
      }
      static async  updatePaymentStatus(payment_status, order_id, trx) {
        await pg("payments").update(payment_status).where({order_id: order_id}).transacting(trx);
      }
      static async  getUserByEmail(email, trx) {
       return await pg("users").select("*").where({email: email}).transacting(trx);
      }
      
      
      
}








