const express = require('express');

const app = express();

const routes = require('./list-view-router');

const routes2 = require('./list-edit-router');

const listaTareas = require('./lista-tareas.json');

const bodyParser = require('body-parser');

const port = 9000;

app.use(express.json());

app.use(bodyParser.json());

app.use('/lista', routes);

app.use('/lista-edit', routes2);

app.get('/', (req, res) => {

    res.status(200).send('Bienvenido');

});

app.listen(port, () => {

    console.log(`Servidor ejecutandose en \n http://localhost:${port}`);

});

