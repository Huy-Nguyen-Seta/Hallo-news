module.exports = {
  routes: [
    {
      method: "GET",
      path: "/getCategories",
      handler: "api::category.category.getCategories",
    },
    {
      method: "GET",
      path: "/findCateBySlug/:slug",
      handler: "api::category.category.findBySlug",
    },
    {
      method: "GET",
      path: "/findCateByPaging",
      handler: "api::category.category.findByPaging",
    },
    {
      method: "GET",
      path: "/findCateSeoBySlug/:slug",
      handler: "api::category.category.findCateSeoBySlug",
    }
  ],
};
