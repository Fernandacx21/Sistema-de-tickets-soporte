const router = require('express').Router();
const usuarioCtrl = require('../controllers/usuarioCtrl');

router.post('/addUsuario', usuarioCtrl.addUsuario);
router.get('/getAllUsuarios', usuarioCtrl.getAllUsuarios);
router.get('/getUsuario/:id', usuarioCtrl.getOneUsuario);
router.delete('/deleteUsuario/:id', usuarioCtrl.deleteUsuario);
router.put('/updateUsuario/:id', usuarioCtrl.updateUsuario);

module.exports = router;