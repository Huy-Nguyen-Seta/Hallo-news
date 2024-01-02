"use strict";

/**
 * nav-bar controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::nav-bar.nav-bar", ({ strapi }) => ({
  async getNavBar(ctx) {
    const entries = await strapi.entityService.findMany(
      "api::nav-bar.nav-bar",
      {
        populate: ["children.icon", "subCate.children.icon"],
      }
    );

    const sanitizedEntries = await this.sanitizeOutput(entries, ctx);

    const response = this.transformResponse(sanitizedEntries);
    return (response?.data || [])?.map((item) => ({
      id: item?.id,
      ...item?.attributes,
    }));
  },
}));
