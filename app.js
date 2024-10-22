require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const alunosRouter = require('./routes/alunos');
const funcionarioRouter = require('./routes/funcionario');
const turmaRouter = require('./routes/turma');
const authRouter = require('./routes/auth');
const setupSwagger = require('./swagger');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para processar requisições com JSON
app.use(express.json()); // Isso permite processar JSON corretamente

// Middleware para processar URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para verificar o corpo da requisição e depuração
app.use((req, res, next) => {
  console.log('Corpo da requisição:', req.body); // Adicionando o console.log para verificar o corpo
  next();
});

// Carregar a chave secreta para JWT
const jwtSecret = process.env.JWT_SECRET; // Adicione aqui

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
      return res.sendStatus(403); // Acesso proibido
  }

  // Use jwtSecret em vez de secretKey
  jwt.verify(token, jwtSecret, (err, user) => { // Substitua secretKey por jwtSecret
      if (err) {
          return res.sendStatus(403); // Acesso proibido
      }
      req.user = user;
      next();
  });
};

app.use('/alunos', alunosRouter);
app.use('/turmas', turmaRouter);
app.use('/funcionarios', funcionarioRouter);
app.use('/auth', authRouter);

setupSwagger(app);

sequelize.sync()
  .then(() => {
    console.log('Banco de dados conectado');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });
