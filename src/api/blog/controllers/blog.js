"use strict";

const {
  getSchemaWeb,
  getSchemaSite,
  getSchemaBreadcrumb,
  getSchemaArticle,
} = require("../constant");

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
        "localizations",
      ],
    };
    const post = await strapi.db.query("api::blog.blog").findMany(query);
    const sanitizedEntity = await this.sanitizeOutput(post, ctx);
    console.log("sanitizedEntity", sanitizedEntity[0].localizations);
    const data = sanitizedEntity[0];
    console.log("data", data);

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
  async updateSchemaBlogs(ctx) {
    // const locale = ctx.query?.locale;
    // const { slug } = ctx.params;
    const query = {
      populate: ["meta", "author.image", "thumbnailImage"],
    };
    const post = await strapi.db.query("api::blog.blog").findMany(query);
    const sanitizedEntity = await this.sanitizeOutput(post, ctx);
    (sanitizedEntity || []).forEach(async (element) => {
      // console.log("element", element);
      let schemaData = {};
      schemaData.websiteSchema = getSchemaWeb(element?.locale);

      // if (!event?.params?.data?.meta?.siteNavigationElementSchema) {
      const query = {
        populate: ["children"],
        orderBy: { priority: "asc" },
        where: { locale: element?.locale },
      };
      const cate = await strapi.db
        .query("api::nav-bar.nav-bar")
        .findMany(query);
      const listCate = cate?.map((item) => ({
        name: item?.name,
        url: `https://hallo.co/${element?.locale}/news/${item?.href || ""}`,
      }));
      schemaData.siteNavigationElementSchema = getSchemaSite(listCate);

      schemaData.breadcrumbSchema = getSchemaBreadcrumb(
        { slug: element.slug, title: element?.title || "" },
        element?.locale
      );

      let author = element.author;

      schemaData.articleSchema = getSchemaArticle(
        {
          slug: element?.slug,
          title: element?.title,
          description: element?.description,
          authorName: author?.name || "",
          authorUrl: `https://hallo.co/${element?.locale}/news/author/${
            author?.slug || ""
          }`,
          logoUrl:
            "https://hallo.co/_next/image?url=%2Fimage%2Flogo-r.png&w=96&q=75",
          imageUrl: `https://admin.hallo.co${
            element?.thumbnailImage?.url || ""
          }`,
        },
        element?.locale
      );

      // console.log("schemaData", schemaData);
      // const metaData = await strapi.db.query("common.meta-data").create({
      //   data: schemaData,
      // });
      // console.log("metaData", metaData);

      // const entry = await strapi.db.query("api::blog.blog").update({
      //   where: { id: element?.id },
      //   data: {
      //     meta: {
      //       id: metaData.id,
      //       __pivot: {
      //         field: "meta",
      //         component_type: "common.meta-data",
      //       },
      //     },
      //   },
      // });
      const data = await strapi.entityService.update(
        "api::blog.blog",
        element?.id,
        {
          data: {
            meta: schemaData,
          },
        }
      );

      // console.log("-----", data);
      // event.params.data.meta = {
      //   id: metaData.id,
      //   __pivot: {
      //     field: "meta",
      //     component_type: "common.meta-data",
      //   },
      // };
      // }
      // console.log("schemaData", schemaData);
      // event.params.data.meta =  schemaData
      // const metaData = await strapi.db.query("common.meta-data").create({
      //   data: schemaData,
      // });
      //////

      // console.log('sanitizedEntity', sanitizedEntity)
    });
  },
}));
