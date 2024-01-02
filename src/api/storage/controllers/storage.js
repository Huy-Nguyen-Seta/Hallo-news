"use strict";

/**
 * storage controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::storage.storage", ({ strapi }) => ({
  async storageBlogs(ctx) {
    const data = ctx.request.body;
    let entry;

    const query = {
      filters: { userId: data?.userId },
      populate: "*",
    };
    const storage = await strapi.entityService.findMany(
      "api::storage.storage",
      query
    );
    const sanitizedEntity = await this.sanitizeOutput(storage, ctx);
    if (sanitizedEntity?.length > 0) {
      const id = sanitizedEntity[0]?.id;
      const currentBlogs = sanitizedEntity[0]?.blogs?.map((item) => item.id);
      if (currentBlogs?.includes(data?.blogs)) {
        entry = await strapi.entityService.update("api::storage.storage", id, {
          data: {
            blogs: currentBlogs?.filter((item) => item !== data?.blogs),
          },
        });
        entry.isDelete = true;
      } else {
        const arr = currentBlogs;
        arr.push(data?.blogs);
        entry = await strapi.entityService.update("api::storage.storage", id, {
          data: {
            blogs: arr,
          },
        });
        entry.isAdd = true;
      }
    } else {
      entry = await strapi.entityService.create("api::storage.storage", {
        data: {
          ...ctx.request.body,
          blogs: [data?.blogs],
          publishedAt: new Date().toISOString(),
        },
      });
      entry.isAdd = true;
    }
    return entry;
  },
  async getStorageByUser(ctx) {
    const { userId, limit, start, withPopulate } = ctx.query;
    const query = {
      ...(withPopulate
        ? {
            populate: ["blogs.thumbnailImage", "blogs.author.image"],
          }
        : { populate: ["blogs"] }),
      filters: { userId: userId },
    };
    const storage = await strapi.entityService.findMany(
      "api::storage.storage",
      query
    );

    const queryTotal = {
      filters: { userId: userId },
      populate: { blogs: { count: true } },
    };

    const totalStorage = await strapi.entityService.findMany(
      "api::storage.storage",
      queryTotal
    );

    const sanitizedEntity = await this.sanitizeOutput(storage, ctx);

    let newBlogs = sanitizedEntity[0]?.blogs;
    if (start && limit) {
      newBlogs = newBlogs.slice(
        Number(start || 0),
        Number(start || 0) + Number(limit || 100)
      );
    }

    return {
      data: {
        ...sanitizedEntity[0],
        blogs: newBlogs,
        total: totalStorage[0]?.blogs?.count,
      },
    };
  },
}));
