"use strict";

/**
 * author controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::author.author", ({ strapi }) => ({
  async findAuthorBySlug(ctx) {
    const locale = ctx.query?.locale;
    const { slug } = ctx.params;
    const query = {
      where: { slug, locale },
      populate: { image: true, blogs: { count: true } },
    };
    const author = await strapi.db.query("api::author.author").findMany(
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(author, ctx);
    return { data: sanitizedEntity[0] };
  },
  async findAuthorSeoBySlug(ctx) {
    const locale = ctx.query?.locale;
    const { slug } = ctx.params;
    const query = {
      where: { slug, locale },
      populate: ["metaData.metaImage"],
    };
    const author = await strapi.db.query("api::author.author").findMany(
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(author, ctx);

    return { data: sanitizedEntity[0] };
  },
  async getAuthors(ctx) {
    const { limit, start, searchValue, locale } = ctx.query;
    const query = {
      populate: { image: true, backgroundImage: true, blogs: { count: true } },
      where: {
        locale,
        ...(searchValue && { name: { $containsi: searchValue } }),
      },
      ...(limit && { limit: Number(limit) }),
      ...(start && { offset: Number(start) }),
    };
    const author = await strapi.db.query("api::author.author").findMany(
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(author, ctx);

    const queryCount = {
      populate: { image: true, backgroundImage: true, blogs: { count: true } },
      where: { ...(searchValue && { name: { $containsi: searchValue } }) },
    };

    const authorCount = strapi.db.query("api::author.author").findMany(
      queryCount
    );
    const countEntity = await this.sanitizeOutput(authorCount, ctx);

    return {
      data: {
        results: (sanitizedEntity || [])?.sort(
          (itemA, itemB) => itemB?.blogs?.count - itemA?.blogs?.count
        ),
        total: countEntity?.length,
      },
    };
  },
}));
