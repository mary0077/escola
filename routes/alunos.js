const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - idade
 *         - nota_primeiro_semestre
 *         - nota_segundo_semestre
 *         - nome_professor
 *         - numero_sala
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *           description: Email do aluno, deve ser único
 *         idade:
 *           type: integer
 *         nota_primeiro_semestre:
 *           type: number
 *           format: float
 *         nota_segundo_semestre:
 *           type: number
 *           format: float
 *         nome_professor:
 *           type: string
 *         numero_sala:
 *           type: integer
 *       example:
 *         id: 1
 *         nome: "João Silva"
 *         email: "joao.silva@example.com"
 *         idade: 15
 *         nota_primeiro_semestre: 8.5
 *         nota_segundo_semestre: 9.0
 *         nome_professor: "Prof. Carlos"
 *         numero_sala: 101
 */

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: API para gerenciar alunos
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Retorna a lista de todos os alunos
 *     tags: [Alunos]
 *     security:
 *      - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 */
router.get('/', alunoController.getAll);

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     security:
 *      - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: Aluno criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 */
router.post('/', alunoController.create);

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Retorna um aluno pelo ID
 *     tags: [Alunos]
 *     security:
 *      - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Dados do aluno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado
 */
router.get('/:id', alunoController.getById);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno pelo ID
 *     tags: [Alunos]
 *     security:
 *      - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado
 */
router.put('/:id', alunoController.update);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Remove um aluno pelo ID
 *     tags: [Alunos]
 *     security:
 *      - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do aluno
 *     responses:
 *       204:
 *         description: Aluno removido
 *       404:
 *         description: Aluno não encontrado
 */
router.delete('/:id', alunoController.delete);
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
