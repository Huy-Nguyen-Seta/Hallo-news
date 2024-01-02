"use strict";

/**
 * services-web-development controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::services-web-development.services-web-development",
  ({ strapi }) => ({
    async getServicesDevelopData(ctx) {
      const { type } = ctx.params;
      const entries = await strapi.entityService.findMany(
        "api::services-web-development.services-web-development",
        {
          populate: [
            "heroSection.image",
            "heroSection.backgroundImage",
            "heroSection.backgroundImage",
            "heroSection.button",
            "breadcrumb",
            "process.items",
            "caseStudies.case_studies.image",
          ],
          filters: { type: type },
        }
      );

      const sanitizedEntries = await this.sanitizeOutput(entries, ctx);

      return sanitizedEntries[0];
    },
    async getServicesDevelopSeo(ctx) {
      const { type } = ctx.params;
      const entries = await strapi.entityService.findMany(
        "api::services-web-development.services-web-development",
        {
          populate: ["metaData.metaImage"],
          filters: { type: type },
        }
      );

      const sanitizedEntries = await this.sanitizeOutput(entries, ctx);

      return sanitizedEntries[0]?.metaData;
    },
  })
);
