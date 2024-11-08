const express = require('express');
const router = express.Router();
const Aluno = require('../models/aluno');
const Turma = require('../models/turma');
const { setRandomFallback } = require('bcryptjs');

router.get('/main', async (req, res) => {
    try {
        const studentData = await Aluno.findAll();
        const classData = await Turma.findAll();

        const studentDataArr = studentData.map(studentData => studentData.dataValues);
        const classDataArr = classData.map(classData => classData.dataValues);

        let data = {
            students: studentDataArr,
            rooms: classDataArr
        };

        res.render('main', { data: data });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;