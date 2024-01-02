module.exports = {
  routes: [
    {
      method: "GET",
      path: "/findAuthorBySlug/:slug",
      handler: "api::author.author.findAuthorBySlug",
    },
    {
      method: "GET",
      path: "/findAuthorSeoBySlug/:slug",
      handler: "api::author.author.findAuthorSeoBySlug",
    },
    {
      method: "GET",
      path: "/getAuthors",
      handler: "api::author.author.getAuthors",
    },
  ],
};
