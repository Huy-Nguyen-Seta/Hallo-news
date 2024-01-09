module.exports = {
  routes: [
    {
      method: "POST",
      path: "/postNotification",
      handler: "api::notifications-from-customer.notifications-from-customer.postNotificationContactForm",
    }
  ],
};
