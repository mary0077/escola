const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Funcionario:
 *       type: object
 *       required:
 *         - nome
 *         - Email
 *         - senha
 *         - cargo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         nome:
 *           type: string
 *         Email:
 *           type: string
 *           format: email
 *         senha:
 *           type: string
 *         cargo:
 *           type: string
 *       example:
 *         id: 1
 *         nome: "Maria Oliveira"
 *         Email: "maria@example.com"
 *         senha: "senhaSegura"
 *         cargo: "Desenvolvedora"
 */

/**
 * @swagger
 * tags:
 *   name: Funcionarios
 *   description: API para gerenciar funcionários
 */

/**
 * @swagger
 * /funcionarios:
 *   get:
 *     summary: Retorna a lista de todos os funcionários
 *     tags: [Funcionarios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de funcionários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Funcionario'
 */
router.get('/', funcionarioController.getAll);

/**
 * @swagger
 * /funcionarios:
 *   post:
 *     summary: Cria um novo funcionário
 *     tags: [Funcionarios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funcionario'
 *     responses:
 *       201:
 *         description: Funcionário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 */
router.post('/', funcionarioController.create);

/**
 * @swagger
 * /funcionarios/{id}:
 *   get:
 *     summary: Retorna um funcionário pelo ID
 *     tags: [Funcionarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Dados do funcionário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 *       404:
 *         description: Funcionário não encontrado
 */
router.get('/:id', funcionarioController.getById);

/**
 * @swagger
 * /funcionarios/{id}:
 *   put:
 *     summary: Atualiza um funcionário pelo ID
 *     tags: [Funcionarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funcionario'
 *     responses:
 *       200:
 *         description: Funcionário atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 *       404:
 *         description: Funcionário não encontrado
 */
router.put('/:id', funcionarioController.update);

/**
 * @swagger
 * /funcionarios/{id}:
 *   delete:
 *     summary: Remove um funcionário pelo ID
 *     tags: [Funcionarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do funcionário
 *     responses:
 *       204:
 *         description: Funcionário removido
 *       404:
 *         description: Funcionário não encontrado
 */
router.delete('/:id', funcionarioController.delete);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Token JWT para autenticação.
 */

module.exports = router;
