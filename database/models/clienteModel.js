const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');

class Cliente extends Model { }

Cliente.init({
    idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rfc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    horas_soporte: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, { sequelize, modelName: 'cliente', initialAutoIncrement: 0 });

module.exports = Cliente;