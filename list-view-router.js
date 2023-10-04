const express = require('express');

const router = express.Router();

const listaTareas = require('./lista-tareas.json');

const bodyParser = require('body-parser');

router.use(express.json());

router.use(bodyParser.json());

router.get('/tareasCompletas', (req, res) => {

    const isCompleted = true;

    const tareasFilter = listaTareas.filter((tarea) => tarea.isCompleted == isCompleted);

    res.status(200).send({listaTareas: tareasFilter});

});

router.get('/tareasIncompletas', (req, res) => {

    const isCompleted = false;

    const tareasFilter = listaTareas.filter((tarea) => tarea.isCompleted == isCompleted);

    res.status(200).send({listaTareas: tareasFilter});

});

module.exports = router;

