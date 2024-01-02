module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/nav-bar', 
      handler: 'api::nav-bar.nav-bar.getNavBar',
    },
  ]
};