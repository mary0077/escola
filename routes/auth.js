const express = require('express');
const { cadastrar, login } = require('../controllers/authController');
const router = express.Router();
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: O email do usuário para autenticação.
 *         senha:
 *           type: string
 *           description: A senha do usuário.
 *       example:
 *         email: "usuario@example.com"
 *         senha: "senhaSegura"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Token JWT usado para autenticação.
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API de autenticação para cadastro e login de usuários.
 */

/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Retorna a página de login.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Página de login carregada com sucesso.
 */
router.get('/login', (req, res) => {
    res.render('login');
});

/**
 * @swagger
 * /auth/register:
 *   get:
 *     summary: Retorna a página de cadastro.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Página de cadastro carregada com sucesso.
 */
router.get('/register', (req, res) => {
    res.render('register');
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastra um novo usuário.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - cargo
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do usuário.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Endereço de email do usuário.
 *               senha:
 *                 type: string
 *                 description: Senha do usuário.
 *               cargo:
 *                 type: string
 *                 description: Cargo do usuário.
 *             example:
 *               nome: "Maria Oliveira"
 *               email: "maria@example.com"
 *               senha: "senhaSegura"
 *               cargo: "Desenvolvedora"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário recém-criado.
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 cargo:
 *                   type: string
 *       400:
 *         description: Falha no cadastro do usuário.
 */
router.post('/register', async (req, res) => {
    const { nome, email, senha, cargo } = req.body;
    console.log({ nome, email, senha, cargo });
    try {
        const funcionario = await cadastrar(nome, email, senha, cargo);
        res.redirect('/auth/login');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um usuário.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Login bem-sucedido. Retorna um token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação.
 *       400:
 *         description: Credenciais inválidas ou falha no login.
 */
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    console.log({ email, senha });
    try {   
        const { token } = await login(email, senha);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
