"use strict";

/**
 * blog controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::blog.blog", ({ strapi }) => ({
  async getNewPostByCategory(ctx) {
    const locale = ctx.query?.locale;
    const { id } = ctx.params;
    await this.validateQuery(ctx);
    const data = await strapi.db.query("api::blog.blog").findMany({
      where: {
        locale: locale,
        publishedAt: {
          $notNull: true,
        },
        ...(id !== "0" && { category: id }),
      },
      orderBy: { createdAt: "desc" },
      populate: ["author.image", "tags", "thumbnailImage", "comments"],
      limit: 5,
    });

    return { data };
  },
  async getNewPostByCategoryNoLimit(ctx) {
    const locale = ctx.query?.locale;
    const { id } = ctx.params;
    await this.validateQuery(ctx);
    const data = await strapi.db.query("api::blog.blog").findMany({
      where: { locale: locale, ...(id !== "0" && { category: id }) },
      orderBy: { createdAt: "desc" },
      populate: ["author.image", "tag", "thumbnailImage", "comments"],
    });

    return { data };
  },
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const query = {
      filters: { slug },
      populate: [
        "tags",
        "author.image",
        "blogs.thumbnailImage",
        "blogs.author.image",
        "blogs.tags",
        "content.blog.thumbnailImage",
        "content.product.image",
        "comments",
        "category",
      ],
    };
    const post = await strapi.entityService.findMany("api::blog.blog", query);
    const sanitizedEntity = await this.sanitizeOutput(post, ctx);

    const data = sanitizedEntity[0];
    if (data.id) {
      const updateViewCount = await strapi.entityService.update(
        "api::blog.blog",
        data.id,
        {
          data: {
            viewCount: data.viewCount ? data.viewCount + 1 : 1,
          },
        }
      );
      // console.log("updateViewCount", updateViewCount);
    }

    return this.transformResponse(sanitizedEntity[0]);
  },
  async findBLogSeoBySlug(ctx) {
    const { slug } = ctx.params;
    const query = {
      filters: { slug },
      populate: ["meta.metaImage"],
    };
    const post = await strapi.entityService.findMany("api::blog.blog", query);
    const sanitizedEntity = await this.sanitizeOutput(post, ctx);
    return this.transformResponse(sanitizedEntity[0]);
  },
  async findBLogByQuery(ctx) {
    const locale = ctx.query?.locale;
    const {
      cateSlug,
      tagSlugs,
      isMostLike,
      isRecent,
      limit,
      start,
      authorSlug,
      searchValue,
    } = ctx.query;
    const query = {
      sort: {
        ...(isRecent && { createdAt: "desc" }),
        ...(isMostLike ? { like: "desc" } : { createdAt: "desc" }),
      },
      populate: ["author.image", "tags", "thumbnailImage", "comments"],
      ...(limit && { limit: Number(limit) }),
      ...(start && { start: Number(start) }),
      filters: {
        publishedAt: {
          $notNull: true,
        },
        locale: locale,
        ...(cateSlug && { category: { slug: cateSlug } }),
        ...(tagSlugs && { tags: { slug: tagSlugs } }),
        ...(authorSlug && { author: { slug: authorSlug } }),
        ...(searchValue && { title: { $containsi: searchValue } }),
      },
    };
    const post = await strapi.entityService.findMany("api::blog.blog", query);
    const postSanitizedEntity = await this.sanitizeOutput(post, ctx);

    //count
    const queryCount = {
      sort: {
        ...(isRecent && { createdAt: "desc" }),
        ...(isMostLike ? { like: "desc" } : { createdAt: "desc" }),
      },
      populate: ["author.image", "tags", "thumbnailImage"],
      filters: {
        publishedAt: {
          $notNull: true,
        },
        locale: locale,
        ...(cateSlug && { category: { slug: cateSlug } }),
        ...(tagSlugs && { tag: { slug: tagSlugs } }),
        ...(authorSlug && { author: { slug: authorSlug } }),
        ...(searchValue && { title: { $containsi: searchValue } }),
      },
    };
    const postQueryCount = await strapi.entityService.findMany(
      "api::blog.blog",
      queryCount
    );
    const countSanitizedEntity = await this.sanitizeOutput(postQueryCount, ctx);
    //end count

    let data = {
      data: { data: postSanitizedEntity, total: countSanitizedEntity?.length },
    };
    return data;
  },

  async likeBlog(ctx) {
    const { blogId } = ctx.request?.body;
    let entry;

    const query = {
      filters: { id: blogId },
      populate: "*",
    };
    const blog = await strapi.entityService.findMany("api::blog.blog", query);
    const sanitizedEntity = await this.sanitizeOutput(blog, ctx);
    const likeCount = sanitizedEntity[0]?.like + 1;

    entry = await strapi.entityService.update("api::blog.blog", blogId, {
      data: {
        like: likeCount,
      },
    });

    return entry;
  },
}));
