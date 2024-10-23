const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Funcionario = sequelize.define('Funcionario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: {
            args: [3],
            msg: "O E-mail deve conter pelo menos 3 caracteres!."
        }
    }
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: {
            args: [6],
            msg: "A senha deve conter pelo menos 6 caracteres!."
        }
    }
  },
  cargo:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Funcionario;
