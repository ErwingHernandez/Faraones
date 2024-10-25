const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const faraonroutes = require('./routes/Faraon.routes')
const PORT = 3000
const http = require('http');
const socketIo = require('socket.io');


const app = express()

const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/faraones', faraonroutes(io))


mongoose.connect("mongodb+srv://herwing43:Nueve123@backenddb.s7yan.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("Connected to database!");

        io.on('connection', (socket) => {
            console.log('Nuevo cliente conectado:', socket.id);

            socket.on('disconnect', () => {
                console.log('Cliente desconectado:', socket.id);
            });
        });

        server.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })