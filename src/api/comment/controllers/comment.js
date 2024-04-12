"use strict";

/**
 * comment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::comment.comment", ({ strapi }) => ({
  async findByPostSlug(ctx) {
    const { slug } = ctx.params;
    const { limit, start, locale } = ctx.query;
    const query = {
      filters: {
        blog: { slug: slug },
        publishedAt: {
          $notNull: true,
        },
      },
      populate: ["comments"],
      sort: { createdAt: "desc" },
      ...(limit && { limit: limit }),
      ...(start && { start: start }),
    };
    const cate = await strapi.entityService.findMany(
      "api::comment.comment",
      query
    );
    const newCate = cate.map((item) => ({
      ...item,
      comments: (item?.comments || []).filter((item) => item?.publishedAt !== null)
    }));
    const sanitizedEntity = await this.sanitizeOutput(newCate, ctx);

    const queryCount = {
      populate: "*",
      filters: {
        blog: { slug: slug },
        publishedAt: {
          $notNull: true,
        },
      },
    };
    const countEntity = await strapi.entityService.findMany(
      "api::comment.comment",
      queryCount
    );

    const countParentComment = countEntity?.filter((item) => item?.blog);

    return {
      data: {
        data: sanitizedEntity,
        total: countEntity?.length,
        totalParent: countParentComment?.length,
      },
    };
  },
  async comment(ctx) {
    const { blogId, userName, comment } = ctx.request?.body;
    const entry = await strapi.entityService.create("api::comment.comment", {
      data: {
        like: 0,
        blog: [blogId],
        name: userName,
        comment: comment,
        // publishedAt: new Date().toISOString(),
      },
    });

    return entry;
  },
  async subComment(ctx) {
    const { commentId, userName, comment } = ctx.request?.body;

    const entry = await strapi.entityService.create("api::comment.comment", {
      data: {
        like: 0,
        name: userName,
        comment: comment,
        // publishedAt: new Date().toISOString(),
      },
    });

    const query = {
      filters: { id: commentId },
      populate: "*",
    };
    const currentComment = await strapi.entityService.findMany(
      "api::comment.comment",
      query
    );
    let listComment = currentComment[0]?.comments?.map((item) => item.id) || [];
    listComment.push(entry?.id);
    const updateComment = await strapi.entityService.update(
      "api::comment.comment",
      commentId,
      {
        data: {
          comments: listComment,
        },
      }
    );

    return updateComment;
  },
  async likeComment(ctx) {
    const { commentId } = ctx.request?.body;
    let entry;

    const query = {
      filters: { id: commentId },
      populate: "*",
    };
    const comment = await strapi.entityService.findMany(
      "api::comment.comment",
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(comment, ctx);
    const likeCount = sanitizedEntity[0]?.like + 1;

    entry = await strapi.entityService.update(
      "api::comment.comment",
      commentId,
      {
        data: {
          like: likeCount,
        },
      }
    );

    return entry;
  },
}));
