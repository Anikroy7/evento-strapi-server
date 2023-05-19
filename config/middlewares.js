module.exports = [
  "strapi::errors",
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'dl.airtable.com', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'dl.airtable.com', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

module.exports.settings = {
  parser: {
    enabled: true,
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // Defaults to 200mb
    },
  },
};

module.exports.upload = {
  breakpoints: {
    xlarge: 1920,
    large: 1000,
    medium: 750,
    small: 500,
    xsmall: 64,
  },
};
