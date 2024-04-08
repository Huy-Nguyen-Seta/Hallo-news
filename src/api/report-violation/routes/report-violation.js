'use strict';

/**
 * report-violation router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::report-violation.report-violation');
