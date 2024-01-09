"use strict";

/**
 * footer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::footer.footer", ({ strapi }) => ({
  async getFooter(ctx) {
    const query = {
      populate: ["Footer.items", "FooterBottom"],
    };
    const footer = await strapi.entityService.findMany(
      "api::footer.footer",
      query
    );
    // const sanitizedEntity = await this.sanitizeOutput(footer, ctx);
    return { data: footer };
  },
}));
