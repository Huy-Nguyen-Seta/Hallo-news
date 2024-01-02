module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/footers', 
      handler: 'api::footer.footer.getFooter',
    },
  ]
};