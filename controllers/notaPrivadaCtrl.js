const NotaPrivada = require('../database/models/notaPrivadaModel');
const Ticket = require('../database/models/ticketModel');
const Usuario = require('../database/models/usuarioModel');

const NotaPrivadaCtrl = {

    addNotaPrivada: async (req, res) => {
        try {
            const { nota_privada, ticketIdTicket, usuarioIdUsuario } = req.body;
            await NotaPrivada.build({
                nota_privada, ticketIdTicket, usuarioIdUsuario
            }).save().then(notaPrivada => {
                res.status(201).json(notaPrivada);
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllNotasPrivadasByTicket: async (req, res) => {
        try {
            const { id } = req.params;
            const notasPrivadas = await NotaPrivada.findAll({
                include: [{
                    model: Ticket,
                    where: { idTicket: id }
                },
                {
                    model: Usuario
                }]
            });
            if (!notasPrivadas) return res.status(400).json('Ninguna nota privada registrada aun');

            res.status(200).json(notasPrivadas);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateNotaPrivada: async (req, res) => {
        try {
            const { id } = req.params;
            const { nota_privada } = req.body;

            await NotaPrivada.update({ nota_privada }, { where: { idNotaPrivada: id } });
            res.status(200).json('Nota privada actualizada');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteNotaPrivada: async (req, res) => {
        try {
            const { id } = req.params;
            await NotaPrivada.destroy({ where: { idNotaPrivada: id } });

            res.status(200).json('Nota privada eliminada');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}

module.exports = NotaPrivadaCtrl;