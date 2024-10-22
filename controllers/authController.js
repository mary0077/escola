// services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Funcionario = require('../models/funcionario.js');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '3h';

async function cadastrar(nome, email, senha, cargo) {
    const hashedPassword = await bcrypt.hash(senha, 10);
    return Funcionario.create({ nome, email, senha: hashedPassword, cargo });
}

async function login(email, senha) {
    const funcionario = await Funcionario.findOne({ where: { email } });
    if (!funcionario) throw new Error('Funcionário não encontrado');

    const isPasswordValid = await bcrypt.compare(senha, funcionario.senha);
    if (!isPasswordValid) throw new Error('Senha incorreta');

    const token = jwt.sign({ id: funcionario.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return { token };
}

// Exporte as funções que deseja usar
module.exports = { cadastrar, login };
