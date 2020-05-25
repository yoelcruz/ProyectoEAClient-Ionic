import express from 'express';
import { Server } from 'http';
import mongoose from 'mongoose';

import cors from 'cors';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from "./routes/usuario";
import postRoutes from './routes/post';
import socketIO  from 'socket.io';

const app = express();
const server = new Server(app);


// IO = esta es la comunicacion del backend
/* io.origins(['http://192.168.1.17:8100']);
import './chat/sockets/socket'; */

app.use( cors());
// Body parser
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// FileUpload
app.use( fileUpload() );

// Configurar CORS
app.use( fileUpload({ useTempFiles: true }) );

// Rutas de mi app
app.use('/user', userRoutes );
app.use('/posts', postRoutes );


// Conectar DB
mongoose.connect('mongodb://localhost:27017/proyectoIonic', 
                {  useNewUrlParser: true, useCreateIndex: true }, ( err ) => {

    if ( err ) throw err;

    console.log('Base de datos ONLINE');
});

export const io = socketIO.listen(server);
io.on('connection', (client) => {

    console.log('connection132123132132123');
    client.on('entrarChat', (data: any, callback) => {
        console.log('entrar chat', data);
    });
});


// Levantar express
server.listen( 3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});

