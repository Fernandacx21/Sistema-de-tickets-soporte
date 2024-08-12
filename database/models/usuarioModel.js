const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');

class Usuario extends Model {}

Usuario.init({
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    idClienteUser: {
        type: DataTypes.INTEGER,
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuario: {
        type:  DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, { sequelize, modelName: 'usuario', initialAutoIncrement: 0 });

Usuario.beforeCreate(async (user) => {
    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
    } catch (error) {
        throw new Error();
    }
});

Usuario.beforeUpdate(async (user) => {
    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
    } catch (error) {
        throw new Error();
    }
});

module.exports = Usuario;