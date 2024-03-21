module.exports = ({ env }) => ({
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        blogs: {
          field: 'slug',
          references: 'title',
        },
      },
    },
  }
  });