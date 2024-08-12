const Servicio = require('../database/models/servicioModel');

const ServicioCtrl = {
    getAllServices: async (req, res) => {
        try {
            const servicios = await Servicio.findAll();
            res.json(servicios);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getService: async (req, res) => {
        try {
            const servicio = await Servicio.findByPk(req.params.id);
            res.json(servicio);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createService: async (req, res) => {
        try {
            const { nombre_servicio, descripcion_servicio, costo_servicio } = req.body;
            await Servicio.build({ nombre_servicio, descripcion_servicio, costo_servicio }).save().then(servicio => {
                res.status(201).json(servicio);
            }).catch(error => {
                res.status(500).json({ message: error.message });
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateService: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre_servicio, descripcion_servicio, costo_servicio } = req.body;
            await Servicio.update({ nombre_servicio, descripcion_servicio, costo_servicio }, { where: { idServicio: id } });
            res.status(200).json('Servicio actualizado');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteService: async (req, res) => {
        try {
            const { id } = req.params;
            await Servicio.destroy({ where: { idServicio: id } });
            res.status(200).json('Servicio eliminado');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = ServicioCtrl;