// NPM Modules
import knex from "knex";
import knexConfigs from "../knex.configs";

function down(pg) {
  return pg.schema
    .dropTableIfExists("users")
    .dropTableIfExists("videos")
    .dropTableIfExists("wishlist")
    .dropTableIfExists("payment_packages")
    .dropTableIfExists("messages")
    .dropTableIfExists("notifications")
    .dropTableIfExists("payments")
    .dropTableIfExists("team")
    .dropTableIfExists("slider_videos")
    .dropTableIfExists("dashboard_texts")
    .dropTableIfExists("users_profile")
    .dropTableIfExists("payments_status_logs");
    
}

async function init() {
  try {
    const options =
      process.env.NODE_ENV === "production"
        ? knexConfigs.production
        : knexConfigs.development;
    const pg = knex(options);
    await down(pg);
    console.log("Successfully dropped all tables1 ... ");
  } catch (error) {
    console.error(error.message);
  }
}

init();
