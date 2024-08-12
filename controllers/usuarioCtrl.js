const Departamento = require('../database/models/departamentoModel');
const Usuario = require('../database/models/usuarioModel');

const UsuarioCtrl = {

    addUsuario: async (req, res) => {
        try {
            const { nombre_usuario, usuario, rol, email, password, idClienteUser, departamentoIdDepartamento } = req.body;

            await Usuario.build({
                nombre_usuario, usuario, rol, email, password, idClienteUser, departamentoIdDepartamento
            }).save().then(usuario => {
                res.status(201).send(usuario);
            });
        } catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    },
    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll({
                include: [{
                    model: Departamento
                }]
            });
            if (!usuarios) return res.status(400).json('Ningun usuario registrado');

            res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getOneUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id, {
                include: [{
                    model: Departamento
                }]
            });

            if (!usuario) return res.status(400).json('El usuario no existe');

            res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre_usuario, usuario, rol, email, departamentoIdDepartamento } = req.body;

            await Usuario.update({ nombre_usuario, usuario, rol, email, departamentoIdDepartamento }, 
                { where: { idUsuario: id }, individualHooks: true });
            res.status(200).json('Usuario modificado');
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            await Usuario.destroy({ where: { idUsuario: id } });

            res.status(201).json({ msg: 'Usuario eliminado' });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}

module.exports = UsuarioCtrl;