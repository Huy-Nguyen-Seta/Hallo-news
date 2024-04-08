'use strict';

/**
 * report-violation controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::report-violation.report-violation',
({ strapi }) => ({
  async postReport(ctx) {
    const entry = await strapi.entityService.create(
      "api::report-violation.report-violation",
      {
        data: {
          ...ctx.request.body,
        },
      }
    );
    return { entry };
  },
})
);

