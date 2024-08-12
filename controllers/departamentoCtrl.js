const Departamento = require('../database/models/departamentoModel');

const DeparttamentoCtrl = {

    addDepartamento: async(req, res) => {
        try {
            const { nombre_departamento } = req.body;
            
            await Departamento.build({
                nombre_departamento
            }).save().then(departamento => {
                res.status(201).send(departamento);
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllDepartamentos: async(req, res) => {
        try {
            const departamentos = await Departamento.findAll();
            if(!departamentos) return res.status(400).json('No hay ningun departamento registrado');
            
            res.status(200).json(departamentos);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getOneDepartamento: async(req, res) => {
        try {
            const { id } = req.params;
            const departamento = await Departamento.findByPk(id);
            if(!departamento) return res.status(400).json('El departamento no existe');

            res.status(200).json(departamento);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateDepartamento: async(req, res) => {
        try {
            const { id } = req.params;
            const { nombre_departamento } = req.body;

            await Departamento.update({ nombre_departamento }, { where: { idDepartamento: id } });
            res.status(200).json('Departamento actualizado');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteDepartamento: async(req, res) => {
        try {
            const { id } = req.params;
            await Departamento.destroy({ where: { idDepartamento: id } });

            res.status(200).json('Departamento eliminado');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}

module.exports = DeparttamentoCtrl;