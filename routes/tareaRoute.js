const router = require('express').Router();
const TareaCtrl = require('../controllers/tareaCtrl');

router.post('/addTarea', TareaCtrl.addTarea);
router.get('/getAllTareasByTicket/:id', TareaCtrl.getAllTareasByTicket);
router.put('/updateTarea/:id', TareaCtrl.updateTarea);
router.delete('/deleteTarea/:id', TareaCtrl.deleteTarea);

module.exports = router;