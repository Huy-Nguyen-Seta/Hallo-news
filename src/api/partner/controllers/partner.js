"use strict";

/**
 * partner controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::partner.partner", ({ strapi }) => ({
  async getPartners(ctx) {
    const locale = ctx.query?.locale;
    const { limit, start } = ctx.query;
    await this.validateQuery(ctx);
    const partners = await strapi.entityService.findMany(
      "api::partner.partner",
      {
        filters: {
          locale: locale,
          publishedAt: {
            $notNull: true,
          },
        },
        sort: { createdDate: "desc" },
        populate: ["thumbnailImage"],
        ...(limit && { limit: Number(limit) }),
        ...(start && { start: Number(start) }),
      }
    );

    const queryCount = {
      filters: {
        locale: locale,
        publishedAt: {
          $notNull: true,
        },
      },
    };
    const postQueryCount = await strapi.entityService.findMany(
      "api::partner.partner",
      queryCount
    );
    const countSanitizedEntity = await this.sanitizeOutput(postQueryCount, ctx);

    return {
      data: { data: partners, total: countSanitizedEntity?.length || 0 },
    };
  },
  async findPartnerBySlug(ctx) {
    const locale = ctx.query?.locale;

    const { slug} = ctx.params;
    const query = {
      filters: { slug, locale },
      populate: ["content", "thumbnailImage"],
    };
    const post = await strapi.entityService.findMany(
      "api::partner.partner",
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(post, ctx);
    return this.transformResponse(sanitizedEntity[0]);
  },
  async findPartnerSeoBySlug(ctx) {
    const locale = ctx.query?.locale;
    const { slug } = ctx.params;
    const query = {
      filters: { slug, locale },
      populate: ["meta.metaImage"],
    };
    const post = await strapi.entityService.findMany(
      "api::partner.partner",
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(post, ctx);
    return this.transformResponse(sanitizedEntity[0]);
  },
}));
