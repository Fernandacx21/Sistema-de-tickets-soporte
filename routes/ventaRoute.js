const router = require('express').Router();
const VentaCtrl = require('../controllers/ventaCtrl');

router.get('/getAllVentas', VentaCtrl.getAllVentas);
router.get('/getVenta/:id', VentaCtrl.getVenta);
router.post('/createVenta', VentaCtrl.createVenta);
router.put('/updateVenta/:id', VentaCtrl.updateVenta);
router.delete('/deleteVenta/:id', VentaCtrl.deleteVenta);

module.exports = router;