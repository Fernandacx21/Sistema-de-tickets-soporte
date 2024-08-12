const jwt = require('jsonwebtoken');
const Usuario = require('../database/models/usuarioModel');
const Ticket = require('../database/models/ticketModel');
const notaPublica = require ('../database/models/notaPublicaModel');
const bcrypt = require('bcrypt');

const Auth = {

    SingIn: async (req, res) => {
        try {
            const { email, password } = req.body;

            const usuario = await Usuario.findOne({ where: { email: email } });
            if (!usuario) return res.status(400).json({ msg: 'El usuario no existe' });

            const isMatch = await bcrypt.compare(password, usuario.password);
            if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

            //If login success, create access token
            const accesstoken = createAccessToken({ id: usuario.idUsuario });

            res.status(200).json({accesstoken, usuario});
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logOut: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/auth/refresh_token' });
            return res.json({ msg: "Logged out" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}

module.exports = Auth