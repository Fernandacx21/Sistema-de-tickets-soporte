const router = require('express').Router();
const departamentoCtrl = require('../controllers/departamentoCtrl');

router.post('/addDepartamento', departamentoCtrl.addDepartamento);
router.get('/getOneDepartamento/:id', departamentoCtrl.getOneDepartamento);
router.get('/getAllDepartamentos', departamentoCtrl.getAllDepartamentos);
router.put('/updateDepartamento/:id', departamentoCtrl.updateDepartamento);
router.delete('/deleteDepartamento/:id', departamentoCtrl.deleteDepartamento);

module.exports = router;