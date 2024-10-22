const Funcionario = require('../models/funcionario'); // Importando o modelo Funcionario

// Função para obter todos os funcionários
exports.getAll = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter funcionários' });
  }
};

// Função para criar um novo funcionário
exports.create = async (req, res) => {
  const { nome, email, senha, cargo } = req.body;

  // Verificar se o e-mail já existe
  try {
    const funcionarioExistente = await Funcionario.findOne({ where: { Email: email } });

    if (funcionarioExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    // Criar o funcionário caso o e-mail não exista
    const novoFuncionario = await Funcionario.create({
      nome,
      Email: email, // Usando a propriedade correta
      senha,
      cargo,
    });

    res.status(201).json(novoFuncionario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar funcionário', details: error.message });
  }
};

// Função para obter um funcionário pelo ID
exports.getById = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (funcionario) {
      res.json(funcionario);
    } else {
      res.status(404).json({ error: 'Funcionário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter funcionário' });
  }
};

// Função para atualizar um funcionário
exports.update = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (funcionario) {
      const { nome, email, senha, cargo } = req.body;
      await funcionario.update({
        nome,
        Email: email, // Atualizando o e-mail
        senha,
        cargo,
      });
      res.json(funcionario);
    } else {
      res.status(404).json({ error: 'Funcionário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar funcionário' });
  }
};

// Função para deletar um funcionário
exports.delete = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (funcionario) {
      await funcionario.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Funcionário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar funcionário' });
  }
};
