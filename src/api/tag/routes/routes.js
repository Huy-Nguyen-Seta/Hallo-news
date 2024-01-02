module.exports = {
  routes: [
    {
      method: "GET",
      path: "/getTags",
      handler: "api::tag.tag.getTags",
    },
    {
      method: "GET",
      path: "/findTagBySlug/:slug",
      handler: "api::tag.tag.findBySlug",
    },
    {
      method: "GET",
      path: "/findTagSeoBySlug/:slug",
      handler: "api::tag.tag.findTagsSeoBySlug",
    }
  ],
};
