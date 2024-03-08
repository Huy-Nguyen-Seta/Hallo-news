"use strict";

/**
 * nav-bar controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::nav-bar.nav-bar", ({ strapi }) => ({
  async getNavBars(ctx) {
    const locale = ctx.query?.locale;
    const query = {
      populate: ["children"],
      orderBy: { priority: "asc" },
      where: { locale },
    };
    const cate = await strapi.db.query("api::nav-bar.nav-bar").findMany(query);
    const sanitizedEntity = await this.sanitizeOutput(cate, ctx);
    return { data: sanitizedEntity };
  },
}));
