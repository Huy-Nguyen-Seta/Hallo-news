module.exports = {
  routes: [
    {
      method: "GET",
      path: "/getServicesDevelopData/:type",
      handler: "api::services-web-development.services-web-development.getServicesDevelopData",
    },
    {
      method: "GET",
      path: "/getServicesDevelopSeo/:type",
      handler: "api::services-web-development.services-web-development.getServicesDevelopSeo",
    }
  ],
};
