module.exports = {
  routes: [
    {
      method: "GET",
      path: "/getPartners",
      handler: "api::partner.partner.getPartners",
    },
    {
      method: "GET",
      path: "/findPartnerBySlug/:slug",
      handler: "api::partner.partner.findPartnerBySlug",
    },
    {
      method: "GET",
      path: "/findPartnerSeoBySlug/:slug",
      handler: "api::partner.partner.findPartnerSeoBySlug",
    },
  ],
};
