'use strict';

/**
 * notifications-from-customer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::notifications-from-customer.notifications-from-customer');
