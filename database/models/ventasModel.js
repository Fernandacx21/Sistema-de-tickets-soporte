const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Venta extends Model { };

Venta.init({
    idVenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    servicios: {
        type: DataTypes.JSON,
        allowNull: false
    },
    cotizacion_total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_termino: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: { 
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize, modelName: 'venta', initialAutoIncrement: 0 });

module.exports = Venta;