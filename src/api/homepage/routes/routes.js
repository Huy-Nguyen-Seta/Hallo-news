module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/homepage/data', 
      handler: 'api::homepage.homepage.getHomepageData',
    },
    {
      method: 'GET',
      path: '/homepage/seo', 
      handler: 'api::homepage.homepage.getHomepageSeo',
    },
    {
      method: 'GET',
      path: '/homepage/postByCate', 
      handler: 'api::homepage.homepage.getHomepagePostByCategory',
    },
  ]
};