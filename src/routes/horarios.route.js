const { Router } = require("express");
const router = Router();
const HorariosController = require("../controllers/horarios.controller");
const { isLoggedIn } = require("../lib/auth");
const controller = new HorariosController();

router.get("/horarios", isLoggedIn, controller.List);
router.post("/horarios/search", isLoggedIn, controller.Buscar);
router.post("/horarios", isLoggedIn, controller.Insert);
router.get("/horarios/add", isLoggedIn, controller.RenderInsert);
router.get("/horarios/editarh/:id", isLoggedIn, controller.RenderEdit);
router.post("/horarios/editarh/:id", isLoggedIn, controller.Edit);
router.get("/horarios/delete/:id", isLoggedIn, controller.EliminarH);
router.get("/horarios/addv2/:id", isLoggedIn, controller.RenderScheduleChoosing)

//for common user
router.get("/public/horarios", controller.listPublicSchedules)
router.post("/public/horarios/search",controller.searchPublicSchedules)
router.get("/horarios/maestro/:id",controller.renderPublicTeacherSchedule)

module.exports = router;