import express from "express";
import http from 'http';
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { Server as SocketioServer } from "socket.io";


// servidor express
const app = express();
// visualizar por consola las peticones
app.use(morgan("dev"));
// direccion ruta absoluta
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// sirviendo archivos
app.use(express.static(path.join(__dirname, '../frontend/dist')));
// creando servidor http con la funcionalidad de express
export const server = http.createServer(app);
// creando el servidor de socketio
export const io = new SocketioServer(server);
// en caso de que el front y el back se encuentran en distintos dominios
// export const io = new SocketioServer(server, {
//   cors: {origin: 'http://localhost:5173'}
// });

// creando un evento (se dispara cuando sucede algo) para cuando suceda una conexion
io.on('connection', socket => {
  console.log('Cliente conectado');
  // escuchando eventos luego de conectarse, el evento usado sera message
  socket.on('message', message => {
    console.log(`Message recived: ${message}`);
    // emitiendo evento de respuesta a todos los clientes, excepto al que emitio el mensaje desde el cliente
    socket.broadcast.emit('message', {
      body: message,
      from: socket.id
    });
  })
});
