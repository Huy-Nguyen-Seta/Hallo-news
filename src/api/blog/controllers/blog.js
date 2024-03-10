"use strict";

/**
 * blog controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::blog.blog", ({ strapi }) => ({
  async getNewPostByCategory(ctx) {
    const locale = ctx.query?.locale;
    const { id } = ctx.params;
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
    const data = await strapi.db.query("api::blog.blog").findMany({
      where: {
        locale: locale,
        publishedAt: {
          $notNull: true,
        },
        ...(id !== "0" && { category: id }),
      },
      orderBy: { createdAt: "desc" },
      populate: ["author.image", "tag", "thumbnailImage", "comments"],
    });

    return { data };
  },
  async findBySlug(ctx) {
    const locale = ctx.query?.locale;
    const { slug } = ctx.params;
    const query = {
      where: { slug, locale },
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
    const post = await strapi.db.query("api::blog.blog").findMany(query);
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
    const locale = ctx.query?.locale;
    const { slug } = ctx.params;
    const query = {
      where: { slug, locale },
      populate: ["meta.metaImage"],
    };
    const post = await strapi.db.query("api::blog.blog").findMany(query);
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
      orderBy: {
        ...(isRecent && { createdAt: "desc" }),
        ...(isMostLike ? { like: "desc" } : { createdAt: "desc" }),
      },
      populate: ["author.image", "tags", "thumbnailImage", "comments"],
      ...(limit && { limit: Number(limit) }),
      ...(start && { offset: Number(start) }),
      where: {
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
    const post = await strapi.db.query("api::blog.blog").findMany(query);
    const postSanitizedEntity = await this.sanitizeOutput(post, ctx);

    //count
    const queryCount = {
      orderBy: {
        ...(isRecent && { createdAt: "desc" }),
        ...(isMostLike ? { like: "desc" } : { createdAt: "desc" }),
      },
      populate: ["author.image", "tags", "thumbnailImage"],
      where: {
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
    const postQueryCount = await strapi.db
      .query("api::blog.blog")
      .findMany(queryCount);
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
      where: { id: blogId },
      populate: ["*"],
    };
    const blog = await strapi.db.query("api::blog.blog").findMany(query);
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
