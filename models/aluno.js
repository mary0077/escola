const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Aluno = sequelize.define('Aluno', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0 
    }
  },
  NotaPrimeiroModulo: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      max: 10.0
    }
  },
  NotaSegundoModulo: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      max: 10.0
    }
  },
  Media: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null
  }
});

module.exports = Aluno;
