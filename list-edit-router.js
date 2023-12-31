const express = require('express');

const router = express.Router();

const listaTareas = require('./lista-tareas.json');

const bodyParser = require('body-parser');

router.use(express.json());

router.use(bodyParser.json());

router.post('/crearTarea', (req, res) => {

    const nuevaTarea = {
        "id":"4",
        "isCompleted":false,
        "description":"Comprar Six"
    }

    listaTareas.push(nuevaTarea);

    res.status(200).send({listaTareas});

});

router.delete('/eliminarTarea/:id', (req, res) => {

    const tareaId = req.params.id;

    const index = listaTareas.findIndex((t) => t.id == tareaId);

    if (index == -1) {
        
        res.status(404).send(
            {
                message: 'Tarea no encontrada'
            }
        )

    } else {

        listaTareas.splice(index, 1);

        res.sendStatus(204);

    }

});

router.put('/actualizarTarea/:id', (req, res) => {

    const tareaId = req.params.id;

    const tareaBody = req.body;

    const index = listaTareas.findIndex((t) => t.id == tareaId);

    if (index == -1) {
        
        res.status(404).send(
            {
                message: 'Tarea no encontrada'
            }
        )

    } else {

        listaTareas[index] = tareaBody;

        res.status(204).send(tareaBody);

    }
});

module.exports = router;