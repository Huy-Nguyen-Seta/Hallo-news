"use strict";

/**
 * tag controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::tag.tag", ({ strapi }) => ({
  async getTags(ctx) {
    const { searchValue } = ctx.query;

    const locale = ctx.query?.locale;
    await this.validateQuery(ctx);

    const data = await strapi.db.query("api::tag.tag").findMany({
      where: {
        locale: locale,
        ...(searchValue && { tagName: { $containsi: searchValue } }),
      },
      orderBy: { createdAt: "asc" },
      populate: { blogs: { count: true } },
    });
    return { data : data };
  },
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const query = {
      filters: { slug },
      populate: { blogs: { count: true } },
    };
    const cate = await strapi.entityService.findMany("api::tag.tag", query);
    const sanitizedEntity = await this.sanitizeOutput(cate, ctx);
    return { data: sanitizedEntity[0] };
  },
  async findTagsSeoBySlug(ctx) {
    const { slug } = ctx.params;
    const query = {
      filters: { slug },
      populate: ["metaData.metaImage"],
    };
    const cate = await strapi.entityService.findMany("api::tag.tag", query);
    const sanitizedEntity = await this.sanitizeOutput(cate, ctx);
    return { data: sanitizedEntity[0] };
  },
}));
