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
    const Turma = await Turma.create(req.body);
    res.status(201).json(Turma);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const Turma = await Turma.findByPk(req.params.id);
    if (Turma) {
      res.json(Turma);
    } else {
      res.status(404).json({ error: 'Turma não encontrado' });
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
      res.status(404).json({ error: 'Turma não encontrado' });
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
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Turma não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
