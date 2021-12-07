const express = require('express')
const router = express.Router()

const controller = require('../controllers/api.horarios.controller');

router.get('/api/test', controller.test)
router.get('/api/listall',controller.ListAll)
router.post('/api/save/:fk_maestro',controller.Save);
router.delete('/api/delete/:id',controller.Delete)

module.exports = router
