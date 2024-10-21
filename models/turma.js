const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Aluno = require('./aluno.js');

const Turma = sequelize.define('Turma', {
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
    type: DataTypes.INTEGER,
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

module.exports = Turma;