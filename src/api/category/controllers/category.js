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

      const data = await strapi.db.query("api::category.category").findMany({
        orderBy: { priority: "asc" },
        where: {locale},
        populate: { image: true, blogs: { count: true } },
      });

      return { data };
    },
    async findBySlug(ctx) {
      const locale = ctx.query?.locale;
      const { slug } = ctx.params;
      const query = {
        where: { slug, locale },
        populate: { image: true, blogs: { count: true } },
      };
      const cate = await strapi.db.query("api::category.category").findMany(
        query
      );
      const sanitizedEntity = await this.sanitizeOutput(cate, ctx);
      return { data: sanitizedEntity[0] };
    },
    async findByPaging(ctx) {
      const { limit, start, searchValue, locale } = ctx.query;
      const query = {
        limit: Number(limit) || 10,
        offset: Number(start) || 0,
        populate: { image: true, blogs: { count: true } },
        orderBy: { priority: "asc" },
        where: {
          locale: { $containsi: locale },
          publishedAt: {
            $notNull: true,
          },
          ...(searchValue && { name: { $containsi: searchValue } }),
        },
      };
      const cate = await strapi.db
        .query("api::category.category")
        .findMany(query);
      const sanitizedEntity = await this.sanitizeOutput(cate, ctx);

      const total = strapi.db.query("api::category.category").findMany({
          where: {
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
        where: { slug, locale },
        populate: ["metaData.metaImage"],
      };
      const cate = await strapi.db.query("api::category.category").findMany(
        query
      );
      const sanitizedEntity = await this.sanitizeOutput(cate, ctx);
      return { data: sanitizedEntity[0] };
    },
  })
);
