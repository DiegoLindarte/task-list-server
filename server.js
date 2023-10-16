const express = require('express');

const app = express();

const routes = require('./list-view-router');

const routes2 = require('./list-edit-router');

const listaTareas = require('./lista-tareas.json');

const bodyParser = require('body-parser');

const validarMetodos = require('./middleware-methods');

const port = 9000;

app.use(express.json());

app.use(bodyParser.json());

app.use('/lista', routes);

app.use('/lista-edit', routes2);

app.use((req, res, next) => {
    
    const metodos = ["GET", "POST", "PUT", "DELETE"];

    if (!metodos.includes(req.method)) {
        
        return res.status(400).json(
            {
                error: "Metodo no valido"
            }
        );

    };

    next();

})

app.use((req, res, next) => {

    const tarea = req.body;

    if (!tarea) {
        
        return res.status(400).json(
            {
                error: "El cuerpo de la solicitud esta vacio"
            }
        );

    };

    if (!tarea.id || typeof tarea.isCompleted === "undefined" || !tarea.description) {
        
        return res.status(400).json(
            {
                error: "Al cuerpo de la solicitud le faltan datos o estan errados"
            }
        );

    };

    next();

});

app.get('/', (req, res) => {

    res.status(200).send('Bienvenido');

});

app.listen(port, () => {

    console.log(`Servidor ejecutandose en \n http://localhost:${port}`);

});

