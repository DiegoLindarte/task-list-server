const express = require('express');

const router = express.Router();

const listaTareas = require('./lista-tareas.json');

const bodyParser = require('body-parser');

router.use(express.json());

router.use(bodyParser.json());

router.get('/tareasCompletas', (req, res) => {

    //const isCompleted = true;

    const tareasCompletas = listaTareas.filter((tarea) => tarea.isCompleted);

    res.status(200).json({tareasCompletas});

});

router.get('/tareasIncompletas', (req, res) => {

    //const isCompleted = false;

    const tareasIncompletas = listaTareas.filter((tarea) => !tarea.isCompleted);

    res.status(200).json({tareasIncompletas});

});

module.exports = router;

