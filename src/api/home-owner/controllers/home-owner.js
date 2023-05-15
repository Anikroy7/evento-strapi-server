"use strict";

/**
 * home-owner controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::home-owner.home-owner");

module.exports = createCoreController(
  "api::home-owner.home-owner",
  ({ strapi }) => ({
    async update(ctx) {
      try {
        const data = ctx.request.body;
        const { id } = ctx.params;
        console.log(data.id);
        const updatedData = await strapi.entityService.findOne(
          "api::home-owner.home-owner",
          id,
          {
            populate: "*",
          }
        );
        console.log("updated Data before", updatedData);
        updatedData.homes.push(parseInt(data || data.id));

        console.log("updated Data after", updatedData);
        await strapi.entityService.update("api::home-owner.home-owner", id, {
          data: updatedData,
        });
        return {
          success: true,
          message: "Data updated successfully",
          updatedData,
        };
      } catch (error) {
        ctx.response.status = 500;
        console.log(error);
        return { error: "error", message: error };
      }
    },
  })
);
