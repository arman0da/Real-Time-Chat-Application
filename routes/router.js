const { SupportRouter } = require("./support.router");

const router = require("express").Router();

router.use("/support", SupportRouter); // Register the support route

module.exports = {
  AllRoutes: router,
};
