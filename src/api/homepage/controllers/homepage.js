"use strict";

/**
 * homepage controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::homepage.homepage",
  ({ strapi }) => ({
    async getHomepageData(ctx) {
      const entries = await strapi.entityService.findMany(
        "api::homepage.homepage",
        {
          populate: [
            "banner.button",
            "banner.thumbnailImage",
            "banner.backgroundImageDecktop",
            "banner.backgroundImageMobile",
            "banner.backgroundImageMobile",
            "services.items.imageCustomer",
            "services.items.logoCompany",
            "services.items.thumbnailImage",
            "ourClients.items.image",
            "slidesCaseStudies.image",
            "introduce.items",
            "serviceOfferings.items.image",
          ],
        }
      );

      const sanitizedEntries = await this.sanitizeOutput(entries, ctx);

      return sanitizedEntries;
    },
    async getHomepageSeo(ctx) {
      const entries = await strapi.entityService.findMany(
        "api::homepage.homepage",
        {
          populate: ["Seo.metaImage"],
        }
      );

      const sanitizedEntries = await this.sanitizeOutput(entries, ctx);
      console.log("sanitizedEntries", sanitizedEntries);

      return sanitizedEntries?.Seo;
    },
  })
);
