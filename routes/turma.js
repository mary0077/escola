const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

// Documentação Swagger permanece a mesma
/**
 * @swagger
 * components:
 *   schemas:
 *     Turma:
 *       type: object
 *       required:
 *         - nome
 *         - instrutor
 *         - alunos
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         nome:
 *           type: string
 *         instrutor:
 *           type: integer
 *           description: ID do instrutor (Funcionário)
 *         alunos:
 *           type: array
 *           items:
 *             type: integer
 *           description: Lista de IDs dos alunos
 *       example:
 *         id: 1
 *         nome: "Turma de Matemática"
 *         instrutor: 2
 *         alunos: [1, 2, 3]
 */

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: API para gerenciar turmas
 */

/**
 * @swagger
 * /turmas:
 *   get:
 *     summary: Retorna a lista de todas as turmas
 *     tags: [Turmas]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turmas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turma'
 */
router.get('/', turmaController.getAll);

/**
 * @swagger
 * /turmas:
 *   post:
 *     summary: Cria uma nova turma
 *     tags: [Turmas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Turma'
 *     responses:
 *       201:
 *         description: Turma criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turma'
 */
router.post('/', turmaController.create);

/**
 * @swagger
 * /turmas/{id}:
 *   get:
 *     summary: Retorna uma turma pelo ID
 *     tags: [Turmas]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Dados da turma
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turma'
 *       404:
 *         description: Turma não encontrada
 */
router.get('/:id', turmaController.getById);

/**
 * @swagger
 * /turmas/{id}:
 *   put:
 *     summary: Atualiza uma turma pelo ID
 *     tags: [Turmas]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da turma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Turma'
 *     responses:
 *       200:
 *         description: Turma atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turma'
 *       404:
 *         description: Turma não encontrada
 */
router.put('/:id', turmaController.update);

/**
 * @swagger
 * /turmas/{id}:
 *   delete:
 *     summary: Remove uma turma pelo ID
 *     tags: [Turmas]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da turma
 *     responses:
 *       204:
 *         description: Turma removida
 *       404:
 *         description: Turma não encontrada
 */
router.delete('/:id', turmaController.delete);
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

module.exports = router;
