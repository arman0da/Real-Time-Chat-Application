const { SupportRouter } = require("./support.router");
const router = require("express").Router();

router.use("/support", SupportRouter); 

module.exports = {
  AllRoutes: router,
};
