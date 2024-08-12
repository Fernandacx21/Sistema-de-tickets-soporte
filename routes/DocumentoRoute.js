const router = require('express').Router();
const documentoCtrl = require('../controllers/documentosCtrl');
const upload = require('../lib/muler');

router.get('/getAllDocumentos', documentoCtrl.getAllDocumentos);
router.get('/getOneDocumento/:id', documentoCtrl.getOneDocumento);
router.post('/addNewDocument', upload.single('documento'), documentoCtrl.addDocumento);

module.exports = router;