const express = require('express');
const { cadastrar, login } = require('../controllers/authController');

const router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/login', (req, res)=>{
    res.render('login');
});

router.get('/register', (req, res)=>{
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { nome, email, senha, cargo } = req.body;
    console.log({ nome, email, senha, cargo });
    try {
        const funcionario = await cadastrar(nome, email, senha, cargo);
        res.status(201).json(funcionario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const { token } = await login(email, senha);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
