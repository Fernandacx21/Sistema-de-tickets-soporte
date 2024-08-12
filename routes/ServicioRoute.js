const router = require('express').Router();
const ServicioCtrl = require('../controllers/servicioCtrl');

router.post('/addServicio', ServicioCtrl.createService);
router.get('/getAllServicios', ServicioCtrl.getAllServices);
router.get('/getServicio/:id', ServicioCtrl.getService);
router.put('/updateServicio/:id', ServicioCtrl.updateService);
router.delete('/deleteServicio/:id', ServicioCtrl.deleteService);

module.exports = router;