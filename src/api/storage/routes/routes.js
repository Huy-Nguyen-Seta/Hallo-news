module.exports = {
  routes: [
    {
      method: "POST",
      path: "/storageBlogs",
      handler: "api::storage.storage.storageBlogs",
    },
    {
      method: "GET",
      path: "/getStorageByUser",
      handler: "api::storage.storage.getStorageByUser",
    },
  ],
};
