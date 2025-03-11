import knex from "knex";
import knexConfigs from "../knex.configs";
import bcrypt from "bcryptjs";
import config from "../src/config/variables.config";
const { ADMIN_PASSWORD } = config;
async function seed(pg) {
  // Inserts seed entries
  try {
    await pg("users").insert([
      {
        role: "superadmin",
        name: "Gevorg",
        surname: "Hakobyan",
        email: "Gevorg@gmail.com",
        password: bcrypt.hashSync(ADMIN_PASSWORD, bcrypt.genSaltSync(10), null),
        payment_package: `0`,
        new_or_existing: `1`,
        status: `unblock`,
        created_at: new Date().toISOString(),
      },
    ]);

    await pg("payment_packages").insert([
      {
        title: "Free",
        text: "Access to 9 references, Search by 3 keywords, File library, , , , , , , , , , , , , ,",
        price: "0",
      },
      {
        title: "Vip",
        text: "Access to 3000+ references, Search by 500+ keywords, File library, Upload your own references, Add references to favorites list, , , , , , , , , , , ,",
        price: "5",
      },
      {
        title: "Enterprise",
        text: "Access to 3000+ references, Search by 500+ keywords, File library, Upload your own references, Add references to favorites list, Priority tech support, Priority reference moderation, Personal administrator dashboard, User management, Add 10+ VIP users to the system, VIP user email newsletter, Notification dispatch, Access to Cinema Room (coming soon), Access to affiliate program (coming soon), Access to Jobs section (coming soon), Access to promotions (coming soon)",
        price: "25",
      },
    ]);

    await pg("team").insert([
      {
        photo: "",
        role: "Developer",
        name: "K. Hayrapetyan",
        fb_link: "https://www.facebook.com/",
        in_link: "https://www.instagram.com/",
        wa_link: "https://www.whatsapp.com/",
        tg_link: "https://web.telegram.org/",
      },
      {
        photo: "",
        role: "Marketing specialist",
        name: "P. Pogosyan",
        fb_link: "https://www.facebook.com/",
        in_link: "https://www.instagram.com/",
        wa_link: "https://www.whatsapp.com/",
        tg_link: "https://web.telegram.org/",
      },
      {
        photo: "",
        role: "Administrator",
        name: "G. Hakobyan",
        fb_link: "https://www.facebook.com/",
        in_link: "https://www.instagram.com/",
        wa_link: "https://www.whatsapp.com/",
        tg_link: "https://web.telegram.org/",
      },
    ]);

    await pg("dashboard_texts").insert([
      {
        header: "",
        title: "",
        text: "Unlock a world of inspiration for creating animations! Access hundreds of references, an organized library, and the ability to upload your own materials—everything you need to bring your ideas to life.",
      },
      {
        header: "Simple, Transparent Pricing",
        title: "",
        text: "",
      },
      {
        header:
          "Activate the DEMO mode and get access to all platform functions for 24 hours",
        title: "Experience the Full Power of Our Platform",
        text: "Activate the demo mode and unlock all platform features for 24 hours—absolutely free. Dive into a seamless workflow, explore advanced tools, and experience the magic of creating professional animations like never before. No commitments, just pure creativity.",
      },
      {
        header: "",
        title: "Bring Your Imagination to Life",
        text: "Our platform is your gateway to creating stunning cartoon animations. Whether you’re a seasoned animator or just starting out, enjoy intuitive tools, reference libraries, and customizable assets to transform your ideas into vibrant, dynamic visuals.",
      },
      {
        header: "",
        title: "Try Before You Commit",
        text: "Curious about the possibilities? Activate your free 24-hour demo and explore tools designed to simplify the art of animation. Sketch, animate, and finalize your projects with ease, while discovering how our platform empowers your creativity.",
      },
    ]);
    await pg("users_profile").insert([
      {
        user_id: "1",
        picture:
          "C:/Users/User/Desktop/JS/Gevor site 27.03 v2.0/Gevor site 07.03 v2.0/27.03/frontend/icons/avatar.jpg",
        name: "Gevorg",
        surname: "Hakobyan",
        phone: "Set your phone number",
        address: "Set your address",
        email: "Gevorg@gmail.com",
        website: "https://refertoonic.com",
        birthday: "Set your birthday",
        gender: "Set your gender",
        about: "Tell us about yourself",
      },
    ]);
  } catch (error) {
    console.error("Error inserting data:", error.message);
  }
}

async function init() {
  try {
    const options =
      process.env.NODE_ENV === "production"
        ? knexConfigs.production
        : knexConfigs.development;

    const pg = knex(options);

    await seed(pg);

    // Close the database connection
    await pg.destroy();

    console.log("Successfully inserted all data.");
  } catch (error) {
    console.error("Initialization error:", error.message);
  }
}

init();
