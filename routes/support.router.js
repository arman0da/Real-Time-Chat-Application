const router = require("express").Router();
const { SupportController } = require("../controllers/support/support.controller");

router.get("/", SupportController.renderChatRoom); // Define the route

module.exports = {
  SupportRouter: router,
};
