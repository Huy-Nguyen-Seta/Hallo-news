"use strict";

/**
 * tag controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::tag.tag", ({ strapi }) => ({
  async getTags(ctx) {
    const { searchValue } = ctx.query;

    const locale = ctx.query?.locale;

    const data = await strapi.db.query("api::tag.tag").findMany({
      where: {
        locale: locale,
        ...(searchValue && { tagName: { $containsi: searchValue } }),
      },
      orderBy: { createdAt: "asc" },
      populate: { blogs: { count: true } },
    });
    return { data: data };
  },
  async findBySlug(ctx) {
    const locale = ctx.query?.locale;
    const { slug } = ctx.params;
    const query = {
      where: { slug, locale },
      populate: { blogs: { count: true } },
    };
    const cate = await strapi.db.query("api::tag.tag").findMany(query);
    const sanitizedEntity = await this.sanitizeOutput(cate, ctx);
    return { data: sanitizedEntity[0] };
  },
  async findTagsSeoBySlug(ctx) {
    const locale = ctx.query?.locale;
    const { slug } = ctx.params;
    const query = {
      where: { slug, locale },
      populate: ["metaData.metaImage"],
    };
    const cate = await strapi.db.query("api::tag.tag").findMany(query);
    const sanitizedEntity = await this.sanitizeOutput(cate, ctx);
    return { data: sanitizedEntity[0] };
  },
}));
