"use strict";

/**
 * partner controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::partner.partner", ({ strapi }) => ({
  async getPartners(ctx) {
    const locale = ctx.query?.locale;
    const { limit, start } = ctx.query;
    const partners = await strapi.db.query("api::partner.partner").findMany({
      where: {
        locale: locale,
        publishedAt: {
          $notNull: true,
        },
      },
      orderBy: { createdDate: "desc" },
      populate: ["thumbnailImage"],
      ...(limit && { limit: Number(limit) }),
      ...(start && { offset: Number(start) }),
    });

    const queryCount = {
      where: {
        locale: locale,
        publishedAt: {
          $notNull: true,
        },
      },
    };
    const postQueryCount = await strapi.db.query("api::partner.partner").findMany(
      queryCount
    );
    const countSanitizedEntity = await this.sanitizeOutput(postQueryCount, ctx);

    return {
      data: { data: partners, total: countSanitizedEntity?.length || 0 },
    };
  },
  async findPartnerBySlug(ctx) {
    const locale = ctx.query?.locale;

    const { slug } = ctx.params;
    const query = {
      where: { slug, locale },
      populate: ["content", "thumbnailImage"],
    };
    const post = await strapi.db.query("api::partner.partner").findMany(
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(post, ctx);
    return this.transformResponse(sanitizedEntity[0]);
  },
  async findPartnerSeoBySlug(ctx) {
    const locale = ctx.query?.locale;
    const { slug } = ctx.params;
    const query = {
      where: { slug, locale },
      populate: ["meta.metaImage"],
    };
    const post = await strapi.db.query("api::partner.partner").findMany(
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(post, ctx);
    return this.transformResponse(sanitizedEntity[0]);
  },
}));
