const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Aluno = sequelize.define('Turma', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  instrutor: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
        model: Aluno,
        key: 'id'
    }
  },
  Alunos: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Aluno;
