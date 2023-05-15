'use strict';

/**
 * home-owner service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::home-owner.home-owner');
