const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class NotaPublica extends Model { }

NotaPublica.init({

    idNotaPublica: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    nota_publica: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, { sequelize, modelName: 'notaPublica', initialAutoIncrement: 0 });

module.exports = NotaPublica;