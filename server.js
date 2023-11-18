const express = require('express');

const jwt = require('jsonwebtoken');

const app = express();

const routes = require('./list-view-router');

const routes2 = require('./list-edit-router');

const listaTareas = require('./lista-tareas.json');

const bodyParser = require('body-parser');

const fs = require('fs');

const validarMetodos = require('./middleware-methods');

require('dotenv').config({path: './.env'});

const port = process.env.PORT;

const secretKey = process.env.SECRETKEY;

app.use(express.json());

app.use(bodyParser.json());

app.use('/lista', routes);

app.use('/lista-edit', routes2);

function authMiddleware(rolReq) {

    return (req, res, next) => {

        const headerToken = req.headers.autorizacion;

        if (!headerToken) {
        
            return res.status(400).json({error: 'No existe token'});

        };

        jwt.verify(headerToken, secretKey, (err, decoded) => {

            if (err) {
            
                return res.status(400).json({error: 'Token no valido'});

            };

            if (decoded.rol !== rolReq) {
                
                return res.status(400).json({error: 'No tienes permisos de acceso'});

            };

            next();

        });

        next();

    };

};

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

    //RECUERDA !!

    /* if (!tarea.id || typeof tarea.isCompleted === "undefined" || !tarea.description || !tarea.user || !tarea.password) {
        
        return res.status(400).json(
            {
                error: "Al cuerpo de la solicitud le faltan datos o estan errados"
            }
        );

    }; */

    next();

});

app.get('/', (req, res) => {

    res.status(200).send('Bienvenido');

});

app.get('/loginProtected', authMiddleware('user'), (req, res) => {

    res.status(200).json({mensaje: 'Ruta protegida'});

});

app.get('/todas', (req, res) => {

    const data = fs.readFileSync('tareas.txt', 'utf8').trim().split('\n');

    res.status(200).json(data);

});

app.post('/login', (req, res) => {

    const {user, password} = req.body;

    if (user == 'admin' && password == 'admin1') {

        const payload = 
        {
            user: user,
            rol: 'admin',
            name: 'Diego',
            id: 11
        };
        
        const token = jwt.sign(payload, secretKey, {expiresIn: '24h'});

        res.status(200).json({token});

    } else {

        res.status(400).json({error: 'Credenciales Incorrectas'});

    }

});

app.post('/tareas', (req, res) => {

    const newTarea = req.body.tarea;

    fs.appendFileSync('tareas.txt', newTarea + '\n');

    res.status(201).json( {message: 'Tarea agregada'} );

});

app.put('/tareas/:index', (req, res) => {

    const index = parseInt(req.params.index);

    const {tarea} = req.body;

    const data = fs.readFileSync('tareas.txt', 'utf8').trim().split('\n');

    if (index >= 0 && index < data.length) {
        
        data[index] = tarea;

        fs.writeFileSync('tareas.txt', data.join('\n'));

        res.status(200).json({message: 'Tarea actualizada'});

    }else{

        res.status(404).json({message: 'La tarea no pudo ser actualizada'});

    };

});

app.delete('/tareas/:index', (req, res) => {

    const index = parseInt(req.params.index);

    const data = fs.readFileSync('tareas.txt', 'utf8').trim().split('\n');

    if (index >= 0 && index < data.length) {
        
        data.splice(index, 1);

        fs.writeFileSync('tareas.txt', data.join('\n'));

        res.status(200).json({message: 'Tarea eliminada'});

    }else{

        res.status(404).json({message: 'La tarea no pudo ser eliminada'});

    };

});

app.listen(port, () => {

    console.log(`Servidor ejecutandose en \n http://localhost:${port}`);

});

