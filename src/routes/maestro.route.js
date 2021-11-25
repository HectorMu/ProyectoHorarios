const { Router } = require("express");
const router = Router();
const MaestroController = require("../controllers/maestro.controller");
const { isLoggedIn } = require("../lib/auth");
const controller = new MaestroController();

router.get("/maestros", isLoggedIn, controller.List);
router.post("/maestros/search", isLoggedIn,  controller.Buscar);
router.post('/maestros', isLoggedIn, controller.Insert)
router.get("/maestros/add", isLoggedIn, controller.RenderInsert);
router.get("/maestros/editarM/:id", isLoggedIn, controller.RenderEdit);
router.post("/maestros/editarM/:id", isLoggedIn, controller.Edit);
router.get("/maestros/delete/:id", isLoggedIn, controller.Eliminar);



module.exports = router;