const {
  SCHEMA,
  BREADCRUMB,
  ARTICLE,
  WEBSITE,
  SITENAVIGATION,
  getSchemaWeb,
  getSchemaBreadcrumb,
  getSchemaArticle,
  getSchemaSite,
} = require("../../constant");

const arabic =
  /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
function toLowerCaseNonAccentVietnamese(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}
const handleTextToUniqueId = (text) => {
  if (text) {
    let newText = toLowerCaseNonAccentVietnamese(text);
    if (!arabic.test(newText)) {
      newText = newText.replace(/[^a-zA-Z0-9\s]/g, "");
    } else {
      newText = newText.replace(
        /[^\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf0-9\s]/g,
        ""
      );
    }
    newText = newText.replaceAll(" ", "-");
    return newText;
  } else {
    return "";
  }
};
module.exports = {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    event.params.data.slug = handleTextToUniqueId(event.params.data.title);
    const schemaData = {};
    const lang = event?.params?.data?.locale;
    // console.log(
    //   "event?.params?.data",
    //   event?.params?.data,
    //   event?.params?.data?.meta
    // );
    // console.log("author", data?.author?.connect);
    if (!event?.params?.data?.meta?.breadcrumbSchema)
      schemaData.breadcrumbSchema = getSchemaBreadcrumb(
        { slug: data.slug, title: data?.title || "" },
        lang
      );

    if (!event?.params?.data?.meta?.articleSchema) {
      let author = {};
      let imageResource = {};
      if (data?.author?.connect[0]?.id) {
        author = await strapi.db.query("api::author.author").findOne({
          populate: {},
          where: { id: data?.author?.connect[0]?.id },
        });
      }
      if (data?.thumbnailImage) {
        // const image = await strapi.plugins.upload.services.upload.fetch({id: data?.thumbnailImage})
        imageResource = await strapi.entityService.findOne(
          "plugin::upload.file",
          `${data?.thumbnailImage}`,
          {
            fields: ["url"],
          }
        );
        // console.log("-imageResource", imageResource);
      }

      schemaData.articleSchema = getSchemaArticle(
        {
          slug: data?.slug,
          title: data?.title,
          description: data?.description,
          authorName: author?.name || "",
          authorUrl: `https://hallo.co/${lang}/news/author/${
            author?.slug || ""
          }`,
          logoUrl:
            "https://hallo.co/_next/image?url=%2Fimage%2Flogo-r.png&w=96&q=75",
          imageUrl: `https://admin.hallo.co${imageResource?.url || ""}`,
        },
        lang
      );
    }

    if (!event?.params?.data?.meta?.websiteSchema)
      schemaData.websiteSchema = getSchemaWeb(lang);

    if (!event?.params?.data?.meta?.siteNavigationElementSchema) {
      const query = {
        populate: ["children"],
        orderBy: { priority: "asc" },
        where: { locale: lang },
      };
      const cate = await strapi.db
        .query("api::nav-bar.nav-bar")
        .findMany(query);
      const listCate = cate?.map((item) => ({
        name: item?.name,
        url: `https://hallo.co/${lang}/news/${item?.href || ""}`,
      }));
      schemaData.siteNavigationElementSchema = getSchemaSite(listCate);
    }
    // console.log("schemaData", schemaData);
    // event.params.data.meta =  schemaData
    const metaData = await strapi.db.query("common.meta-data").create({
      data: schemaData,
    });
    // console.log("metaData", metaData);

    event.params.data.meta = {
      id: metaData.id,
      __pivot: {
        field: "meta",
        component_type: "common.meta-data",
      },
    };
  },
  afterCreate(event) {
    const { result, params } = event;
  },
};
