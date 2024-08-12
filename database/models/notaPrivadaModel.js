const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class NotaPrivada extends Model { }

NotaPrivada.init({

    idNotaPrivada: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    nota_privada: {
        type:  DataTypes.STRING,
        allowNull: false
    }

}, { sequelize, modelName: 'notaPrivada', initialAutoIncrement: 0 });

module.exports = NotaPrivada;