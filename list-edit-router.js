const express = require('express');

const router = express.Router();

const listaTareas = require('./lista-tareas.json');

const bodyParser = require('body-parser');

router.use(express.json());

router.use(bodyParser.json());

const validarTarea = (req, res, next) => {

    const {id, isCompleted, description} = req.body;

    if ( !id || !isCompleted || !description ) {
        
        return res.status(400).json({

            error: "Todos los datos son necesarios"

        });

    };

    next();

};

router.post('/crearTarea', validarTarea, (req, res) => {

    const nuevaTarea = req.body

    listaTareas.push(nuevaTarea);

    res.status(200).json({listaTareas});

});

router.put('/actualizarTarea/:id', validarTarea, (req, res) => {

    const tareaId = req.params.id;

    const tareaBody = req.body;

    const index = listaTareas.findIndex((t) => t.id == tareaId);

    if (index == -1) {
        
        res.status(404).json({message: 'Tarea no encontrada'});

    } else {

        listaTareas[index] = tareaBody;

        res.status(204).json({message: 'Tarea actualizada'});

    };
});

router.delete('/eliminarTarea/:id', (req, res) => {

    const tareaId = req.params.id;

    const index = listaTareas.findIndex((t) => t.id == tareaId);

    if (index == -1) {
        
        res.status(404).json({message: 'Tarea no encontrada'});

    } else {

        listaTareas.splice(index, 1);

        res.status(204).json({message: 'Tarea eliminada'});

    };

});

module.exports = router;