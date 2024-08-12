const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Documentos extends Model { };

Documentos.init({
    idDocumento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_documento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_contrato: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_termino: {
        type: DataTypes.DATE,
        allowNull: false
    },
    documento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cloudinary_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'documentos', initialAutoIncrement: 0 });

module.exports = Documentos;