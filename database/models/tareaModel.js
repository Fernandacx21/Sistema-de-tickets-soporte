const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Tarea extends Model { }

Tarea.init({

    idTarea: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    asunto_tarea: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion_tarea: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_tarea: {
        type: DataTypes.STRING,
        allowNull: false
    },
    generado_por: DataTypes.STRING,
    fecha_creacion: {
        type: DataTypes.DATE,
    },
    fecha_vencimiento: {
        type: DataTypes.DATE,
    }

}, { sequelize, modelName: 'tarea', initialAutoIncrement: 0 } );

module.exports = Tarea;