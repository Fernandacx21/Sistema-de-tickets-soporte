const Ticket = require('../database/models/ticketModel');
const Usuario = require('../database/models/usuarioModel');
const Tareas = require('../database/models/tareaModel');
const Cliente = require('../database/models/clienteModel');
const Dept = require('../database/models/departamentoModel');
const sequelize = require('sequelize');

const KPI = {

    getTicketsLenght: async (req, res) => {
        try {

            const ticket = (await Ticket.findAll()).length;

            res.status(200).json(ticket);

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getTicketsPendiente: async (req, res) => {
        try {

            const ticket = (await Ticket.findAll({ where: { status: 'Pendiente' } })).length;

            res.status(200).json(ticket);

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getTicketsEnProceso: async (req, res) => {
        try {

            const ticket = (await Ticket.findAll({ where: { status: 'En Proceso' } })).length;

            res.status(200).json(ticket);

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getTicketsResuelto: async (req, res) => {
        try {

            const ticket = (await Ticket.findAll({ where: { status: 'Resuelto' } })).length;

            res.status(200).json(ticket);

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getTicketsCerrado: async (req, res) => {
        try {

            const ticket = (await Ticket.findAll({ where: { status: 'Cerrado' } })).length;

            res.status(200).json(ticket);

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getTicketsByTecnico: async (req, res) => {
        try {
            const ticketUser = (await Usuario.findAll({
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(
                            SELECT COUNT(*) FROM tickets AS ticket
                            WHERE ticket.usuarioIdUsuario  = usuario.idUsuario AND usuario.rol = 0
                        )`),
                            'TicketPorUsuario'
                        ]
                    ]
                }
            }));

            res.status(200).json({ data: ticketUser });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getTicketByDepartamento: async (req, res) => {
        try {

            const deptTicket = await Dept.findAll({
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(
                                SELECT COUNT(*) FROM tickets AS ticket
                                WHERE ticket.departamentoIdDepartamento = departamento.idDepartamento
                            )`),
                            'TicketPorDept'
                        ]
                    ]
                }
            });

            res.status(200).json({ data: deptTicket });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getTicketsByClientes: async (req, res) => {
        try {
            const clientTicket = await Cliente.findAll({
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(
                                SELECT COUNT(*) FROM tickets AS ticket
                                WHERE ticket.clienteIdCliente = cliente.idCliente
                            )`),
                            'TicketPorClient'
                        ]
                    ]
                }
            });
            res.status(200).json({ data: clientTicket });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getTareasByUsuario: async (req, res) => {
        try {

            const TaskByUser = await Usuario.findAll({
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(
                                SELECT COUNT(*) FROM tareas AS tarea
                                WHERE tarea.usuarioIdUsuario = usuario.idUsuario AND usuario.rol = 0
                            )`),
                            'TaskByUser'
                        ]
                    ]
                }
            });
            res.status(200).json({ data: TaskByUser });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getHorasByTicket: async (req, res) => {
        try {
            const { id } = req.params;
            await Ticket.findByPk(id, {
                attributes: ['idTicket', 'hora_inicio', 'hora_termino']
            }).then((data) => {
                if (data.hora_inicio && data.hora_termino) {
                    let horaInicio = data.hora_inicio
                    let minutosInicio = horaInicio.split(':')
                    let totalInicio = parseInt(minutosInicio[0]) * 60 + parseInt(minutosInicio[1]);

                    let horaTermino = data.hora_termino
                    let minutosTermino = horaTermino.split(':')
                    let totalTermino = parseInt(minutosTermino[0]) * 60 + parseInt(minutosTermino[1]);

                    let minutos = totalTermino - totalInicio;
                    let horas = minutos / 60;
                    res.status(200).json({ hours: horas, idTicket: data.idTicket });
                } else {
                    return res.status(404).json({ msg: 'El ticket no tiene hora de inicio o termino' });
                }
                
            }).catch(err => {
                return res.status(500).json({ msg: err.message });
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }


}

module.exports = KPI;