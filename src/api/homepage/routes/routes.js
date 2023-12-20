module.exports = {
  routes: [
    {
      method: "GET",
      path: "/homepages/data",
      handler: "api::homepage.homepage.getHomepageData",
    },
    {
      method: "GET",
      path: "/homepages/seo",
      handler: "api::homepage.homepage.getHomepageSeo",
    },
  ],
};
