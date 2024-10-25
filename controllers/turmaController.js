const Turma = require('../models/turma');

exports.getAll = async (req, res) => {
  try {
    const turmas = await Turma.findAll();
    res.json(turmas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { Alunos } = req.body;

    // Verifica se o aluno já está em outra turma
    const turmaExistente = await Turma.findOne({ where: { Alunos } });
    if (turmaExistente) {
      return res.status(400).json({ error: "Aluno já está associado a outra turma." });
    }

    // Cria a nova turma
    const turma = await Turma.create(req.body);
    res.status(201).json(turma);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const turma = await Turma.findByPk(req.params.id);
    if (turma) {
      res.json(turma);
    } else {
      res.status(404).json({ error: 'Turma não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Turma.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTurma = await Turma.findByPk(req.params.id);
      res.json(updatedTurma);
    } else {
      res.status(404).json({ error: 'Turma não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Turma.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({message: "Deletado com sucesso!."});
    } else {
      res.status(404).json({ error: 'Turma não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
