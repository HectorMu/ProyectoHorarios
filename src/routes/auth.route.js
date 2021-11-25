const { Router } = require('express')
const router = Router()
const Controller = require('../controllers/auth.controller')
const { isNotLoggedIn } = require('../lib/auth')

const controller = new Controller();

//Login routes
router.get('/login', isNotLoggedIn, controller.RenderLogin);
router.post('/login', isNotLoggedIn, controller.Login)
router.get('/logout', controller.Logout);

module.exports = router