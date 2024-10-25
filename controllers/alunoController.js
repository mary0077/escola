const { INTEGER } = require('sequelize');
const Aluno = require('../models/aluno');

// Função para obter todos os alunos
exports.getAll = async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    //console.log(alunos);
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter alunos' });
  }
};

// Função para criar um novo aluno

// Função para criar um novo aluno
exports.create = async (req, res) => {
  try {
      const { nome, email, idade, nota_primeiro_semestre, nota_segundo_semestre } = req.body;

      // Verifique se o email está definido
      if (!email) {
          return res.status(400).json({ error: 'O campo e-mail é obrigatório' });
      }

      // Verificar se o e-mail já existe
      const alunoExistente = await Aluno.findOne({ where: { email } });

      if (alunoExistente) {
          return res.status(400).json({ error: 'E-mail já cadastrado' });
      }

      // Criar o aluno caso o e-mail não exista
      const aluno = await Aluno.create({
          nome,
          email,
          idade,
          NotaPrimeiroModulo: nota_primeiro_semestre,
          NotaSegundoModulo: nota_segundo_semestre,
          Media: ((parseFloat(nota_primeiro_semestre) + parseFloat(nota_segundo_semestre))/2), // ou calcular com base nas notas
      });

      res.status(201).json(aluno);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao criar aluno', details: error.message });
  }
};


// Função para obter um aluno pelo ID
exports.getById = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (aluno) {
      res.json(aluno);
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter aluno' });
  }
};

// Função para atualizar um aluno
exports.update = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (aluno) {
      const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;

      // Atualiza os dados do aluno
      await aluno.update({
        nome,
        idade,
        NotaPrimeiroModulo: nota_primeiro_semestre,
        NotaSegundoModulo: nota_segundo_semestre,
        Media: null, // ou recalcular
      });

      res.json(aluno);
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
};

// Função para deletar um aluno
exports.delete = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (aluno) {
      await aluno.destroy();
      res.json({message: "Deletado com sucesso!."});
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar aluno: ' + error });
  }
};
