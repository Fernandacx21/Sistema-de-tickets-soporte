const Cliente = require('../database/models/clienteModel');
const Departamento = require('../database/models/departamentoModel');
const Ticket = require('../database/models/ticketModel');
const Usuario = require('../database/models/usuarioModel');

const TicketCtrl = {

    addTicket: async (req, res) => {
        try {
            const { asunto, descripcion_ticket, status, prioridad, sla, fecha_vencimiento, usuarioIdUsuario, user_ticket,
                hora_inicio, clienteIdCliente, departamentoIdDepartamento, servicioIdServicio } = req.body;

            await Ticket.build({
                asunto, descripcion_ticket, status, prioridad, sla, fecha_vencimiento, usuarioIdUsuario, user_ticket,
                hora_inicio, clienteIdCliente, departamentoIdDepartamento, fecha_creacion: Date.now(), servicioIdServicio
            }).save().then(ticket => {
                res.status(201).send(ticket);
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getOneTicket: async (req, res) => {
        try {
            const { id } = req.params;
            const ticket = await Ticket.findByPk(id, {
                include: [{
                    model: Usuario
                },
                {
                    model: Cliente
                },
                {
                    model: Departamento
                }
                ]
            });
            if (!ticket) return res.status(400).json('El ticket no existe');

            res.status(200).json([ticket]);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllTickets: async (req, res) => {
        try {
            const tickets = await Ticket.findAll({
                include: [{
                    model: Usuario
                },
                {
                    model: Cliente
                },
                {
                    model: Departamento
                }
                ]
            });
            if (!tickets) return res.status(400).json('No hay ningun ticket registrado aun');

            res.status(200).json(tickets);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getTicketByUser: async (req, res) => {
        try {
            const { id } = req.params;
            const tickets = await Ticket.findAll({
                where: {
                    usuarioIdUsuario: id
                },
                include: [{
                    model: Usuario
                },
                {
                    model: Cliente
                },
                {
                    model: Departamento
                }
                ]
            });

            if (!tickets) return res.status(400).json('No hay ningun ticket registrado aun');

            res.status(200).json(tickets);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getTicketByClient: async (req, res) => {
        try {
            const { id } = req.params;
            const tickets = await Ticket.findAll({
                where: {
                    clienteIdCliente: id
                },
                include: [{
                    model: Usuario
                },
                {
                    model: Cliente
                },
                {
                    model: Departamento
                }
                ]
            });

            if (!tickets) return res.status(400).json('No hay ningun ticket registrado aun');

            res.status(200).json(tickets);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateTicket: async (req, res) => {
        try {
            const { id } = req.params;
            const { asunto, descripcion_ticket, status, prioridad, sla, fecha_vencimiento, hora_inicio, hora_termino, usuarioIdUsuario,
                clienteIdCliente, departamentoIdDepartamento, servicioIdServicio } = req.body;

            await Ticket.update({
                asunto, descripcion_ticket, status, prioridad, sla, fecha_vencimiento, hora_inicio, hora_termino, usuarioIdUsuario,
                clienteIdCliente, departamentoIdDepartamento, servicioIdServicio
            },
                { where: { idTicket: id } });

            res.status(200).json('Ticket actualizado');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteTicket: async (req, res) => {
        try {
            const { id } = req.params;
            await Ticket.destroy({ where: { idTicket: id } });

            res.status(200).json('Ticket eliminado');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}

module.exports = TicketCtrl;