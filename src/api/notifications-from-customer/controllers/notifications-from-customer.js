"use strict";

/**
 * notifications-from-customer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::notifications-from-customer.notifications-from-customer",
  ({ strapi }) => ({
    async postNotificationContactForm(ctx) {
      const entry = await strapi.entityService.create(
        "api::notifications-from-customer.notifications-from-customer",
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
