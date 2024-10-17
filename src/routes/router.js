const Router = require('express');
const router = Router();

const layoutController = require('../Controller/LayoutController');




router.get('/layout',layoutController.verLayout);
router.post('/layout',layoutController.datosLayout);


module.exports = router;