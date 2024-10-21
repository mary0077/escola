const Funcionario = require('../models/funcionario');

exports.getAll = async (req, res) => {
  try {
    const funcionario = await Funcionario.findAll();
    res.json(funcionario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const FuncionarioData = req.body;
    if(!isValidEmail(FuncionarioData.Email)){
      throw new Error("O e-mail fornecido não é válido.");
    }
    const Funcionario = await Funcionario.create(FuncionarioData);
    res.status(201).json(Funcionario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const Funcionario = await Funcionario.findByPk(req.params.id);
    if (Funcionario) {
      res.json(Funcionario);
    } else {
      res.status(404).json({ error: 'Funcionario não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Funcionario.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const Fpdatedfuncionario = await Funcionario.findByPk(req.params.id);
      res.json(Fpdatedfuncionario);
    } else {
      res.status(404).json({ error: 'Funcionario não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Funcionario.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Funcionario não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //valida se é coisa@coisa.com
  return regex.test(email);
}