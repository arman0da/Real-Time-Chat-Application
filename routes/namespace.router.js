const { NamespaceController } = require("../controllers/support/namespace.controller.js");
const router = require("express").Router();
router.post("/add", NamespaceController.addNamespace)
router.get("/list", NamespaceController.getListOfNamespaces)
module.exports = {
    ApiNamespaceRouter : router
}