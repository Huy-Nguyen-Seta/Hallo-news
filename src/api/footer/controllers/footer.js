'use strict';

/**
 * footer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::footer.footer' ,({ strapi }) => ({
    async getFooter(ctx) {
      const entries = await strapi.entityService.findMany(
        "api::footer.footer",
        {
          populate: ["FooterItem.children"],
        }
      );
  
      const sanitizedEntries = await this.sanitizeOutput(entries, ctx);
  
      return this.transformResponse(sanitizedEntries);
    },
  }));
