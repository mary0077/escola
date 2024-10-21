const Aluno = require('../models/aluno');

// Função para obter todos os alunos
exports.getAll = async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter alunos' });
  }
};

// Função para criar um novo aluno
exports.create = async (req, res) => {
  try {
    const { nome, email, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;
    const aluno = await Aluno.create({
      nome,
      email, // Incluindo o email
      idade,
      NotaPrimeiroModulo: nota_primeiro_semestre,
      NotaSegundoModulo: nota_segundo_semestre,
      Media: null, // ou calcular com base nas notas
      // Adicione os campos adicionais aqui se necessário
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
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar aluno' });
  }
};
