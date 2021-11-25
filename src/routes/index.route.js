const { Router } = require("express");
const router = Router();
const IndexController = require("../controllers/index.controller");
const controller = new IndexController();

router.get("/", controller.List);

module.exports = router;
