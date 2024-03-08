"use strict";

/**
 * footer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::footer.footer", ({ strapi }) => ({
  async getFooter(ctx) {
    const locale = ctx.query?.locale;
    const query = {
      populate: ["Footer.items", "FooterBottom"],
      where: { locale },
    };

    const footer = await strapi.db.query("api::footer.footer").findMany(query);
    // const sanitizedEntity = await this.sanitizeOutput(footer, ctx);
    return { data: footer };
  },
}));
