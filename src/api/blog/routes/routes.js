module.exports = {
  routes: [
    {
      method: "GET",
      path: "/byCate/:id",
      handler: "api::blog.blog.getNewPostByCategory",
    },
    {
      method: "GET",
      path: "/getBlog/:slug",
      handler: "api::blog.blog.findBySlug",
    },
    {
      method: "GET",
      path: "/getBlogSeo/:slug",
      handler: "api::blog.blog.findBLogSeoBySlug",
    },
    {
      method: "GET",
      path: "/getBLogsByQuery",
      handler: "api::blog.blog.findBLogByQuery",
    },
    {
      method: "POST",
      path: "/likedBlog",
      handler: "api::blog.blog.likeBlog",
    },
  ],
};
