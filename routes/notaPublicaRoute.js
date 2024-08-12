const router = require('express').Router();
const NotaPublicaCtrl = require('../controllers/notaPublicaCtrl');

router.post('/addNotaPublica', NotaPublicaCtrl.addNotaPublica);
router.get('/getAllNotasPublicasByTicket/:id', NotaPublicaCtrl.getAllNotasPublicasByTicket);
router.put('/updateNotaPublica/:id', NotaPublicaCtrl.updateNotaPublica);
router.delete('/deleteNotaPublica/:id', NotaPublicaCtrl.deleteNotaPublica);

module.exports = router