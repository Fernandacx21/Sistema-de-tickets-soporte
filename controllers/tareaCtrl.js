const Tarea = require('../database/models/tareaModel');
const Ticket = require('../database/models/ticketModel');
const Usuario = require('../database/models/usuarioModel');

const TareaCtrl = {

    addTarea: async (req, res) => {
        try {
            const { asunto_tarea, descripcion_tarea, status_tarea, fecha_vencimiento,
                ticketIdTicket, usuarioIdUsuario } = req.body;

            await Tarea.build({
                asunto_tarea, descripcion_tarea, status_tarea, fecha_vencimiento,
                ticketIdTicket, usuarioIdUsuario, fecha_creacion: Date.now()
            }).save().then(tarea => {
                res.status(201).json(tarea);
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllTareasByTicket: async (req, res) => {
        try {
            const { id } = req.params;
            const tareas = await Tarea.findAll({
                include: [{
                    model: Ticket,
                    where: { idTicket: id }
                },
                {
                    model: Usuario
                }
                ]
            });
            if (!tareas) return res.status(400).json('No hay ninguna tarea registrada aun');

            res.status(200).json(tareas);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateTarea: async (req, res) => {
        try {
            const { id } = req.params;
            const { asunto_tarea, descripcion_tarea, status_tarea, generado_por, fecha_vencimiento,
                ticketIdTicket, usuarioIdUsuario } = req.body;

            await Tarea.update({
                asunto_tarea, descripcion_tarea, status_tarea, generado_por, fecha_vencimiento,
                ticketIdTicket, usuarioIdUsuario
            },
                { where: { idTarea: id } });

            res.status(200).json('Tarea modificada');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteTarea: async (req, res) => {
        try {
            const { id } = req.params;
            await Tarea.destroy({ where: { idTarea: id } });

            res.status(200).json('Tarea Eliminada');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }


}

module.exports = TareaCtrl;