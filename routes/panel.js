const express = require('express');
const router = express.Router();
const Aluno = require('../models/aluno');
const Turma = require('../models/turma');

router.get('/main', async (req, res)=>{
    try{
        const [studentData] = await Aluno.findAll();
        const [classData] = await Turma.findAll();

        let data = {
            students : studentData && studentData.dataValues ? [studentData.dataValues] : [],
            class: classData && classData.dataValues ? [classData.dataValues] : []
        }

        res.render('main', {data: data});
    }catch(err){
        console.log(err);
    }
})

module.exports = router;