"use strict";

/**
 * author controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::author.author", ({ strapi }) => ({
  async findAuthorBySlug(ctx) {
    const { slug } = ctx.params;
    const query = {
      filters: { slug },
      populate: { image: true, blogs: { count: true } },
    };
    const author = await strapi.entityService.findMany(
      "api::author.author",
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(author, ctx);
    return { data: sanitizedEntity[0] };
  },
  async findAuthorSeoBySlug(ctx) {
    const { slug } = ctx.params;
    const query = {
      filters: { slug },
      populate: ["metaData.metaImage"],
    };
    const author = await strapi.entityService.findMany(
      "api::author.author",
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(author, ctx);

    return { data: sanitizedEntity[0] };
  },
  async getAuthors(ctx) {
    const { limit, start, searchValue } = ctx.query;
    const query = {
      populate: { image: true, backgroundImage: true, blogs: { count: true } },
      filters: { ...(searchValue && { name: { $containsi: searchValue } }) },
      ...(limit && { limit: Number(limit) }),
      ...(start && { start: Number(start) }),
    };
    const author = await strapi.entityService.findMany(
      "api::author.author",
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(author, ctx);

    const queryCount = {
      populate: { image: true, backgroundImage: true, blogs: { count: true } },
      filters: { ...(searchValue && { name: { $containsi: searchValue } }) },
    };

    const authorCount = await strapi.entityService.findMany(
      "api::author.author",
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
