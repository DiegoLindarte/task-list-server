const express = require('express');

const router = express.Router();

const listaTareas = require('./lista-tareas.json');

const bodyParser = require('body-parser');

router.use(express.json());

router.use(bodyParser.json());

router.get('/tareas', (req, res) => {

    //const isCompleted = true;

    const tareas = listaTareas;

    res.status(200).json({tareas});

});

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

router.get('/tarea/:id', (req, res) => {

    const tareaId = parseInt(req.params.id);

    const tarea = listaTareas.find((t) => t.id == tareaId);

    if (tarea == -1) {
        
        res.status(404).json({message: 'Tarea no encontrada'});

    } else {

        res.status(200).json({tarea});

    };
});

module.exports = router;

