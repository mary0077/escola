const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Aluno = sequelize.define('Funcionario', {
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
    allowNull: false
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
  }
});

module.exports = Aluno;
