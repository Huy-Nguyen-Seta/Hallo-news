module.exports = {
    routes: [
      {
        method: "POST",
        path: "/postReport",
        handler: "api::report-violation.report-violation.postReport",
      }
    ],
  };
  