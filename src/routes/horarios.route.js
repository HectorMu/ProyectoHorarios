const { Router } = require("express");
const router = Router();
const HorariosController = require("../controllers/horarios.controller");
const { isLoggedIn } = require("../lib/auth");
const controller = new HorariosController();

router.get("/horarios", controller.List);
router.post("/horarios/search", controller.Buscar);
router.post("/horarios", isLoggedIn, controller.Insert);
router.get("/horarios/add", isLoggedIn, controller.RenderInsert);
router.get("/horarios/editarh/:id", isLoggedIn, controller.RenderEdit);
router.post("/horarios/editarh/:id", isLoggedIn, controller.Edit);
router.get("/horarios/delete/:id", isLoggedIn, controller.EliminarH);

module.exports = router;