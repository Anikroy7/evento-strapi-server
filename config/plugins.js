module.exports = ({ env }) => {

  /* console.log(env('CLOUDINARY_NAME'),env('CLOUDINARY_SECRET'), env('CLOUDINARY_KEY')); */
 return {

    // ...
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
    // ...
  }
};

