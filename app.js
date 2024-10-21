require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const alunosRouter = require('./routes/alunos');
const setupSwagger = require('./swagger');

const app = express();
app.use(bodyParser.json());

app.use('/alunos', alunosRouter);

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
