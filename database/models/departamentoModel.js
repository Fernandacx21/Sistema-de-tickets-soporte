const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Departamento extends Model { }

Departamento.init({
    idDepartamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_departamento: {
        type:  DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'departamento', initialAutoIncrement: 0 });

module.exports = Departamento;