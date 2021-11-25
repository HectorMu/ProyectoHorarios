const { Router } = require("express");
const router = Router();
const AdministradorController = require("../controllers/administrador.controller");
const { isLoggedIn } = require("../lib/auth");
const controller = new AdministradorController();

router.get("/administradores", isLoggedIn, controller.List);
router.post("/administradores/search", isLoggedIn, controller.Buscar);
router.post("/administradores", isLoggedIn, controller.Insert);
router.get("/administradores/add", isLoggedIn, controller.RenderInsert);
router.get("/administradores/edit/:id", isLoggedIn, controller.RenderEdit);
router.post("/administradores/edit/:id", isLoggedIn, controller.Edit);
router.get("/administradores/delete/:id", isLoggedIn, controller.Eliminar);

module.exports = router;
