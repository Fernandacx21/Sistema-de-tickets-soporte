require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const sequelize = require('./database/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Settings
const port = process.env.PORT || 8080;
require('./database/associations');

app.use(cors({
    origin: ['http://localhost:4200', 'https://sdt-trulinux-soft.herokuapp.com']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.get('', (req, res) => {
    res.send('Servidor iniciado');
});
app.use('/usuario', require('./routes/usuarioRoute'));
app.use('/departamento', require('./routes/departamentoRoute'));
app.use('/cliente', require('./routes/clienteRoute'));
app.use('/ticket', require('./routes/ticketRoute'));
app.use('/tarea', require('./routes/tareaRoute'));
app.use('/notaPrivada', require('./routes/notaPrivadaRoute'));
app.use('/notaPublica', require('./routes/notaPublicaRoute'));
app.use('/auth', require('./routes/AuthRoute'));
app.use('/venta', require('./routes/ventaRoute'));
app.use('/servicio', require('./routes/servicioRoute'));
app.use('/kpis', require('./routes/kpisRoute'));
app.use('/documento', require('./routes/documentoRoute'));

//Inicializar servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto: `, port);

    //Connect to database
    sequelize.sync({ force: false }).then((res) => {
        console.log('Base de datos conectada');
    }).catch(err => {
        console.log('Error al conectar la base de datos', err);
    });
});

module.exports = app;