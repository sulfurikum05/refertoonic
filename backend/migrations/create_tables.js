// NPM Modules
import knex from "knex";
import knexConfigs from "../knex.configs";

function up(pg) {
  return pg.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("surname");
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("role").notNullable();
      table.string("payment_package").notNullable();
      table.string("admin_id");
      table.string("new_or_existing").notNullable();
      table.string("status").notNullable();
      table.dateTime("created_at");
    })

    .createTable("videos", (table) => {
      table.increments("id").primary();
      table.string("user_id").notNullable();
      table.string("video_url");
      table.string("gif_url");
      table.string("title").notNullable();
      table.text("keywords").notNullable();
      table.string("status");
      table.dateTime("upload_at").defaultTo(pg.fn.now());
    })

    .createTable("wishlist", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .integer("video_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("videos")
        .onDelete("CASCADE");
      table.dateTime("add_at").defaultTo(pg.fn.now());
    })

    .createTable("payment_packages", (table) => {
      table.increments("id").primary();
      table.text("title").notNullable();
      table.text("text").notNullable();
      table.string("price").notNullable();
    })

    .createTable("messages", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.text("email").notNullable();
      table.text("name").notNullable();
      table.text("subject");
      table.text("text").notNullable();
      table.dateTime("created_at").defaultTo(pg.fn.now());
    })

    .createTable("notifications", (table) => {
      table.increments("id").primary();
      table.text("title").notNullable();
      table.text("text").notNullable();
      table.text("reciever_user").notNullable();
      table.text("reciever_vip").notNullable();
      table.text("reciever_admin").notNullable();
      table.text("sender").notNullable();
      table.text("status").notNullable();
      table.dateTime("send_at").defaultTo(pg.fn.now());
    })

    .createTable("payments", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.text("payment_id").notNullable();
      table.text("order_id").notNullable();
      table.text("order_description").notNullable();
      table.text("method").notNullable();
      table.text("package").notNullable();
      table.text("price").notNullable();
      table.text("period").notNullable();
      table.text("status").notNullable();
      table.text("invoice_url").notNullable();
      table.text("expire_at");
      table.dateTime("created_at").defaultTo(pg.fn.now());
    })

    .createTable("team", (table) => {
      table.increments("id").primary();
      table.text("photo").notNullable();
      table.text("role").notNullable();
      table.text("name").notNullable();
      table.text("fb_link").notNullable();
      table.text("in_link").notNullable();
      table.text("wa_link").notNullable();
      table.text("tg_link").notNullable();
    })

    .createTable("slider_videos", (table) => {
      table.increments("id").primary();
      table.text("video").notNullable();
    })

    .createTable("dashboard_texts", (table) => {
      table.increments("id").primary();
      table.text("header").notNullable();
      table.text("title").notNullable();
      table.text("text").notNullable();
    })

    .createTable("users_profile", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.text("picture");
      table.text("name").notNullable();
      table.text("surname");
      table.text("phone");
      table.text("address");
      table.text("email").notNullable();
      table.text("website");
      table.text("birthday");
      table.text("gender");
      table.text("about");
    });
}

async function init() {
  try {
    const options =
      process.env.NODE_ENV === "production"
        ? knexConfigs.production
        : knexConfigs.development;
    const pg = knex(options);
    await up(pg);
    console.log("Successfully created all tables");
    process.kill(process.pid);
  } catch (error) {
    console.error(error.message);
  }
}

init();
