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
      sort: { priority: "asc" },
      filters: { locale },
    };
    const cate = await strapi.entityService.findMany(
      "api::nav-bar.nav-bar",
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(cate, ctx);
    return { data: sanitizedEntity };
  },
}));
