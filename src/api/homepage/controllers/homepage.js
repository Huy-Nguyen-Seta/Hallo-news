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
        const data = await strapi.db.query("api::homepage.homepage").findOne({
        populate: [
          "NewPost.categories",
          "PopularPost",
          "Section1.category.blogs.tags",
          "Section1.category.blogs.thumbnailImage",
          "Section1.category.blogs.author",
          "Section1.category.blogs.comments",
          "Section1.tags",
        ],
        where: { locale: locale },
      });

      const popularPost = await strapi.db.query("api::blog.blog").findMany({
        orderBy: { like: "desc" },
        where: {
          locale: locale,
          publishedAt: {
            $notNull: true,
          },
        },
        populate: ["thumbnailImage", "tags", "author.image", "comments"],
      });
      if (data?.PopularPost && popularPost) {
        data.PopularPost = { ...data.PopularPost, data: popularPost };
      }
      if (data?.Section1?.tags) {
        const tagPost = data?.Section1?.tags.map((item) => ({
          [item?.id]: data?.Section1?.category?.blogs?.filter((items) =>
            items?.tags?.map((value) => value.id)?.includes(item?.id) && items?.publishedAt !== null
          ),
        }));

        data.Section1.tagPost = tagPost;
      }

      return { data };
    },
    async getHomepageSeo(ctx) {
      const locale = ctx.query?.locale;
        const data = await strapi.db.query("api::homepage.homepage").findOne({
        populate: ["Seo.metaImage"],
        where: { locale: locale },
      });
      return { data };
    },
    async getHomepagePostByCategory(ctx) {
      const locale = ctx.query?.locale;
        const data = await strapi.db.query("api::homepage.homepage").findOne({
        populate: [
          "PostByCategory.category.blogs.tags",
          "PostByCategory.category.blogs.thumbnailImage",
          "PostByCategory.category.blogs.author.image",
          "PostByCategory.category.blogs.comments",
        ],
        where: {
          locale: locale,
        },
      });
      const sumWithInitial = data?.PostByCategory?.reduce(
        (accumulator, currentValue) => [
          ...accumulator,
          {
            ...currentValue,
            category: {
              ...currentValue?.category,
              blogs: currentValue?.category?.blogs?.filter(
                (item) => item?.publishedAt !== null
              ),
            },
          },
        ],
        []
      );
      return { data: { PostByCategory: sumWithInitial } };
    },
  })
);
