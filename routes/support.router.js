const { ApiNamespaceRouter } = require("./namespace.router");
const { ApiRoomRouter } = require("./room.router");
const router = require("express").Router();

router.use("/namespace", ApiNamespaceRouter); 
router.use("/room", ApiRoomRouter);

module.exports = {
  SupportRouter: router,
};
