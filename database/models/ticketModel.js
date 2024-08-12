const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Ticket extends Model { }

Ticket.init({

    idTicket: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    descripcion_ticket: {
        type: DataTypes.STRING,
        allowNull: false
    },
    asunto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prioridad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sla: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
    },
    user_ticket: DataTypes.STRING,
    fecha_vencimiento: DataTypes.DATE,
    hora_inicio: DataTypes.TIME,
    hora_termino: DataTypes.TIME,

}, { sequelize, modelName: 'ticket', initialAutoIncrement: 0 });

module.exports = Ticket