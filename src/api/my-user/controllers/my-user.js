"use strict";

/**
 * my-user controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::my-user.my-user");

module.exports = createCoreController("api::my-user.my-user", ({ strapi }) => ({
  //create user
  async create(ctx) {
    const data = ctx.request.body;

    console.log("data", data, data.data.email);
    try {
      const entry = await strapi.db.query("api::my-user.my-user").findOne({
        where: { email: data.data.email },
      });
      console.log(entry);
      if (entry) {
        return { success: true, message: "user Exits", data: entry };
      }

      const createdData = await strapi
        .service("api::my-user.my-user")
        .create(data);
      return {
        success: true,
        message: "User created successfully",
        data: createdData,
      };
    } catch (error) {
      ctx.response.status = 500;
      console.log(error);
      return { error: "error", message: error };
    }
  },

}));
