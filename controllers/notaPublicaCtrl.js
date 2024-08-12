const NotaPublica = require('../database/models/notaPublicaModel');
const Ticket = require('../database/models/ticketModel');
const Usuario = require('../database/models/usuarioModel');

const NotaPublicaCtrl = {

    addNotaPublica: async (req, res) => {
        try {
            const { nota_publica, ticketIdTicket, usuarioIdUsuario } = req.body;
            await NotaPublica.build({
                nota_publica, ticketIdTicket, usuarioIdUsuario
            }).save().then(notaPublica => {
                res.status(201).json(notaPublica);
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllNotasPublicasByTicket: async (req, res) => {
        try {
            const { id } = req.params;
            const notasPublicas = await NotaPublica.findAll({
                include: [{
                    model: Ticket,
                    where: { idTicket: id }
                }, {
                    model: Usuario
                }
                ]
            });
            if (!notasPublicas) return res.status(400).json('Ninguna nota publica registrada aun');

            res.status(200).json(notasPublicas);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateNotaPublica: async (req, res) => {
        try {
            const { id } = req.params;
            const { nota_publica, ticketIdTicket } = req.body;

            await NotaPublica.update({ nota_publica, ticketIdTicket }, { where: { idNotaPublica: id } });
            res.status(200).json('Nota publica actualizada');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteNotaPublica: async (req, res) => {
        try {
            const { id } = req.params;
            await NotaPublica.destroy({ where: { idNotaPublica: id } });

            res.status(200).json('Nota publica eliminada');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}

module.exports = NotaPublicaCtrl;