const router = require('express').Router();
const NotaPrivadaCtrl = require('../controllers/notaPrivadaCtrl');

router.post('/addNotaPrivada', NotaPrivadaCtrl.addNotaPrivada);
router.get('/getAllNotasPrivadasByTicket/:id', NotaPrivadaCtrl.getAllNotasPrivadasByTicket);
router.put('/updateNotaPrivada/:id', NotaPrivadaCtrl.updateNotaPrivada);
router.delete('/deleteNotaPrivada/:id', NotaPrivadaCtrl.deleteNotaPrivada);

module.exports = router