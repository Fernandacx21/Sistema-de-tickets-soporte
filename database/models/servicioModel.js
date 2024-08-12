const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Servicio extends Model { }

Servicio.init({
    idServicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_servicio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion_servicio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    costo_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }


}, { sequelize, modelName: 'servicio', initialAutoIncrement: 0 });

module.exports = Servicio;