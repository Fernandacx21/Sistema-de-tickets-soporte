const Cliente = require('../database/models/clienteModel');

const ClienteCtrl = {

    addCliente: async(req, res) => {
        try {
            const { nombre_cliente, direccion_cliente, email_cliente, tipo_cliente,
            telefono_cliente, rfc, horas_soporte } = req.body;
            
            await Cliente.build({
                nombre_cliente, direccion_cliente, email_cliente, tipo_cliente,
                telefono_cliente, rfc, horas_soporte
            }).save().then(cliente => {
                res.status(201).json(cliente);
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllClientes: async(req, res) => {
        try {
            const clientes = await Cliente.findAll();
            if(!clientes) return res.status(400).json('Ningun cliente registrado aun');
            
            res.status(200).json(clientes);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getOneCliente: async(req, res) => {
        try {
            const { id } = req.params;
            const cliente = await Cliente.findByPk(id);
            if(!cliente) return res.status(400).json('No existe el cliente');

            res.status(200).json(cliente);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateCliente: async(req, res) => {
        try {
            const { id } = req.params;
            const { nombre_cliente, direccion_cliente, email_cliente, tipo_cliente,
                tipo_contrato, telefono_cliente, rfc, horas_soporte } = req.body;

            await Cliente.update({ nombre_cliente, direccion_cliente, email_cliente, tipo_cliente,
                tipo_contrato, telefono_cliente, rfc, horas_soporte }, {
                where: { idCliente: id }, individualHooks: true
            });
            res.status(200).json('Cliente modificado');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteCliente: async(req, res) => {
        try {
            const { id } = req.params;
            await Cliente.destroy({ where: { idCliente: id } });
            
            res.status(200).json('Cliente eliminado');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}

module.exports = ClienteCtrl;