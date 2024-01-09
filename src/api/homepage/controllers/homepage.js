"use strict";

/**
 * homepage controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::homepage.homepage",
  ({ strapi }) => ({
    async getHomepageData(ctx) {
      const locale = ctx.query?.locale;
      await this.validateQuery(ctx);
      const data = await strapi.db.query("api::homepage.homepage").findOne({
        populate: [
          "NewPost.categories",
          "PopularPost",
          "Section1.category.blogs.tag",
          "Section1.category.blogs.thumbnailImage",
          "Section1.category.blogs.author",
          "Section1.category.blogs.comments",
          "Section1.tags",
        ],
        where: { locale: locale },
      });

      const popularPost = await strapi.db.query("api::blog.blog").findMany({
        orderBy: { like: "desc" },
        where: { locale: locale },
        populate: ["thumbnailImage", "tag", "author.image", "comments"],
      });
      if (data?.PopularPost && popularPost) {
        data.PopularPost = { ...data.PopularPost, data: popularPost };
      }
      if (data?.Section1?.tags) {
        const tagPost = data?.Section1?.tags.map((item) => ({
          [item?.id]: data?.Section1?.category?.blogs?.filter(
            (items) => items?.tag?.id === item?.id
          ),
        }));

        data.Section1.tagPost = tagPost;
      }

      return { data };
    },
    async getHomepageSeo(ctx) {
      const locale = ctx.query?.locale;
      await this.validateQuery(ctx);
      const data = await strapi.db.query("api::homepage.homepage").findOne({
        populate: ["Seo.metaImage"],
        where: { locale: locale },
      });
      return { data };
    },
    async getHomepagePostByCategory(ctx) {
      const locale = ctx.query?.locale;
      await this.validateQuery(ctx);
      const data = await strapi.db.query("api::homepage.homepage").findOne({
        populate: [
          "PostByCategory.category.blogs.tag",
          "PostByCategory.category.blogs.thumbnailImage",
          "PostByCategory.category.blogs.author.image",
          "PostByCategory.category.blogs.comments",
        ],
        where: { locale: locale },
      });
      return { data };
    },
  })
);
