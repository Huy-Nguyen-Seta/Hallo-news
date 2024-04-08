'use strict';

/**
 * report-violation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::report-violation.report-violation');
