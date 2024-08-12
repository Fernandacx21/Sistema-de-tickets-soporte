const router = require('express').Router();
const KPI = require('../middlewares/kpis');

router.get('/getTicketLength', KPI.getTicketsLenght);
router.get('/getTicketPendiente', KPI.getTicketsPendiente);
router.get('/getTicketEnProceso', KPI.getTicketsEnProceso);
router.get('/getTicketResuelto', KPI.getTicketsResuelto);
router.get('/getTicketCerrado', KPI.getTicketsCerrado);

router.get('/getTicketByTecnico', KPI.getTicketsByTecnico);
router.get('/getTicketByDept', KPI.getTicketByDepartamento);
router.get('/getTicketByCliente', KPI.getTicketsByClientes);
router.get('/getTareaByUsuario', KPI.getTareasByUsuario);
router.get('/getHoraByTicket/:id', KPI.getHorasByTicket);

module.exports = router