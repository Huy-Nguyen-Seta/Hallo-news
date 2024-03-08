"use strict";

/**
 * category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async getCategories(ctx) {
      const locale = ctx.query?.locale;
      const limit = ctx.query?.limit;
      await this.validateQuery(ctx);

      const data = await strapi.db.query("api::category.category").findMany({
        where: { locale: locale },
        orderBy: { priority: "asc" },
        populate: { image: true, blogs: { count: true } },
      });

      return { data };
    },
    async findBySlug(ctx) {
      const locale = ctx.query?.locale;
      const { slug } = ctx.params;
      const query = {
        filters: { slug, locale },
        populate: { image: true, blogs: { count: true } },
      };
      const cate = await strapi.entityService.findMany(
        "api::category.category",
        query
      );
      const sanitizedEntity = await this.sanitizeOutput(cate, ctx);
      return { data: sanitizedEntity[0] };
    },
    async findByPaging(ctx) {
      const { limit, start, searchValue, locale } = ctx.query;
      const query = {
        limit: Number(limit) || 10,
        start: Number(start) || 0,
        populate: { image: true, blogs: { count: true } },
        sort: { priority: "asc" },
        filters: {
          locale: { $containsi: locale },
          publishedAt: {
            $notNull: true,
          },
          ...(searchValue && { name: { $containsi: searchValue } }),
        },
      };
      const cate = await strapi.entityService.findMany(
        "api::category.category",
        query
      );
      const sanitizedEntity = await this.sanitizeOutput(cate, ctx);

      const total = await strapi.entityService.findMany(
        "api::category.category",
        {
          filters: {
            locale: locale,
            ...(searchValue && { name: { $containsi: searchValue } }),
          },
        }
      );

      const getTotal = await this.sanitizeOutput(total, ctx);
      return {
        data: { results: sanitizedEntity, total: getTotal?.length || 0 },
      };
    },
    async findCateSeoBySlug(ctx) {
      const locale = ctx.query?.locale;
      const { slug } = ctx.params;
      const query = {
        filters: { slug, locale },
        populate: ["metaData.metaImage"],
      };
      const cate = await strapi.entityService.findMany(
        "api::category.category",
        query
      );
      const sanitizedEntity = await this.sanitizeOutput(cate, ctx);
      return { data: sanitizedEntity[0] };
    },
  })
);
