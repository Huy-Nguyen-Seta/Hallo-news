module.exports = {
  routes: [
    {
      method: "GET",
      path: "/findByPostSlug/:slug",
      handler: "api::comment.comment.findByPostSlug",
    },
    {
      method: "POST",
      path: "/comment",
      handler: "api::comment.comment.comment",
    },
    {
      method: "POST",
      path: "/subComment",
      handler: "api::comment.comment.subComment",
    },
    {
      method: "POST",
      path: "/likeComment",
      handler: "api::comment.comment.likeComment",
    },
  ],
};
