"use strict";

/**
 * footer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::footer.footer", ({ strapi }) => ({
  async getFooter(ctx) {
    const query = {
      populate: ["menus"],
    };
    const cate = await strapi.entityService.findMany(
      "api::footer.footer",
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(cate, ctx);
    return { data: sanitizedEntity };
  },
}));
