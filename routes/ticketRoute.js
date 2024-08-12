const router = require('express').Router();
const TicketCtrl = require('../controllers/ticketCtrl');

router.post('/addTicket', TicketCtrl.addTicket);
router.get('/getAllTickets', TicketCtrl.getAllTickets);
router.get('/getOneTicket/:id', TicketCtrl.getOneTicket);
router.get('/getAllTicketsByUser/:id', TicketCtrl.getTicketByUser);
router.get('/getAllTicketsByClient/:id', TicketCtrl.getTicketByClient);
router.put('/updateTicket/:id', TicketCtrl.updateTicket);
router.delete('/deleteTicket/:id', TicketCtrl.deleteTicket);

module.exports = router;