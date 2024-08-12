const Venta = require('../database/models/ventasModel');

const VentaCtrl = {
    getAllVentas: async (req, res) => {
        try {
            const ventas = await Venta.findAll();
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getVenta: async (req, res) => {
        try {
            const venta = await Venta.findByPk(req.params.id);
            res.json(venta);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createVenta: async (req, res) => {
        try {
            const { cotizacion_total, descripcion, status, clienteIdCliente, usuarioIdUsuario, fecha_termino } = req.body;
            await Venta.build({status, cotizacion_total, descripcion, fecha_termino,
                clienteIdCliente, usuarioIdUsuario  }).save().then((venta) => {
                res.status(201).json(venta);
            }).catch(error => {
                res.status(500).json({ message: error.message });
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateVenta: async (req, res) => {
        try {
            const { id } = req.params;
            const { cotizacion, fecha, descripcion } = req.body;
            await Venta.update({ cotizacion, fecha, descripcion }, { where: { idVenta: id } });
            res.status(200).json('Venta actualizado');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteVenta: async (req, res) => {
        try {
            const { id } = req.params;
            await Venta.destroy({ where: { idVenta: id } });
            res.status(200).json('Venta eliminado');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = VentaCtrl;