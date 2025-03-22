import knex from "knex";
import knexConfigs from "../../knex.configs";
const pg = knex(knexConfigs.development);

export class VipModel {
  
  static async getVideos(limit, offset, trx) {
    return await pg("videos").select("id", "video_url", "gif_url", "title", "keywords").where("status", 1).orderBy("upload_at", "desc").limit(limit).offset(offset).transacting(trx);
  }

  static async getVideosFromWishlist(array, trx) {
    return await pg("wishlist").select("*").whereIn("video_id",array.map((item) => item.video_id)).whereIn("user_id",array.map((item) => item.user_id)).transacting(trx);
  }

  static async uploadLibraryVideo(video) {
    await pg("videos").insert(video);
  }

  static async getFileLibraryData(userId) {
    return await pg("videos").select("*").where({ user_id: userId });
  }

  static async getWishlistData(userId, trx) {
    return await pg("wishlist").select("*").where({ user_id: userId }).transacting(trx);
  }

  static async getVideosFromId(videosId, trx) {
    return await pg("videos").select("*").whereIn("id", videosId).transacting(trx);
  }

  static async addVideoToWishlist(userId, videoId) {
    await pg("wishlist").insert({ user_id: userId, video_id: videoId });
  }

  static async removeVideoFromWishlist(userId, videoId) {
    await pg("wishlist").where({ user_id: userId, video_id: videoId }).del();
  }

  static async getVideosBySearch() {
    return await pg("videos").select('*').where({status: "1"})
  }
  
  static async getNotificationsData(trx) {
    return await pg("notifications").select("*").where({ reciever_vip: "1", sender: "superadmin" }).transacting(trx);
  }

  static async getSenderAdminNotificationsData(adminId, trx) {
    return await pg("notifications").select("*").where({ reciever_vip: "1", sender: adminId }).transacting(trx);
  }
}

