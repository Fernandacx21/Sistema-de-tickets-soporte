const router = require('express').Router();
const ClienteCtrl = require('../controllers/clienteCtrl');

router.post('/addCliente', ClienteCtrl.addCliente);
router.get('/getAllClientes', ClienteCtrl.getAllClientes);
router.get('/getOneCliente/:id', ClienteCtrl.getOneCliente);
router.put('/updateCliente/:id', ClienteCtrl.updateCliente);
router.delete('/deleteCliente/:id', ClienteCtrl.deleteCliente);

module.exports = router;