const Usuario = require('./models/usuarioModel');
const Departamento = require('./models/departamentoModel');
const Ticket = require('./models/ticketModel');
const Cliente = require('./models/clienteModel');
const Tarea = require('./models/tareaModel');
const NotaPrivada = require('./models/notaPrivadaModel');
const NotaPublica = require('./models/notaPublicaModel');
const Venta = require('./models/ventasModel');
const Servicio = require('./models/servicioModel');
const Documentos = require('./models/documentosModel');


Departamento.hasMany(Usuario, { foreignKey: 'departamentoIdDepartamento' });
Usuario.belongsTo(Departamento);

Usuario.hasMany(Ticket, { foreignKey: 'usuarioIdUsuario' });
Ticket.belongsTo(Usuario);

Cliente.hasMany(Ticket, { foreignKey: 'clienteIdCliente' });
Ticket.belongsTo(Cliente);

Departamento.hasMany(Ticket, { foreignKey: 'departamentoIdDepartamento' });
Ticket.belongsTo(Departamento);

Usuario.hasMany(Tarea, { foreignKey: 'usuarioIdUsuario' });
Tarea.belongsTo(Usuario);

Ticket.hasMany(Tarea, { foreignKey: 'ticketIdTicket' });
Tarea.belongsTo(Ticket);

Ticket.hasMany(NotaPrivada, { foreignKey: 'ticketIdTicket' });
NotaPrivada.belongsTo(Ticket);

Ticket.hasMany(NotaPublica, { foreignKey: 'ticketIdTicket' });
NotaPublica.belongsTo(Ticket);

Usuario.hasMany(NotaPrivada, { foreignKey: 'usuarioIdUsuario' });
NotaPrivada.belongsTo(Usuario);

Usuario.hasMany(NotaPublica, { foreignKey: 'usuarioIdUsuario' });
NotaPublica.belongsTo(Usuario);

Servicio.hasMany(Ticket, { foreignKey: 'servicioIdServicio' });
Ticket.belongsTo(Servicio);

Cliente.hasMany(Venta, { foreignKey: 'clienteIdCliente' });
Venta.belongsTo(Cliente);

Usuario.hasMany(Venta, { foreignKey: 'usuarioIdUsuario' });
Venta.belongsTo(Usuario);

Cliente.hasMany(Documentos, { foreignKey: 'clienteIdCliente' });
Documentos.belongsTo(Cliente);