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

let activeUsers = 0;
const emitActiveUsers = (socket) => socket.broadcast.emit('activeUsers', activeUsers);

// creando un evento (se dispara cuando sucede algo) para cuando suceda una conexion
io.on('connection', socket => {
  activeUsers++;
  console.log('Cliente conectado '+ socket.id + ', Usuarios activos ' + activeUsers);

  // escuchando eventos luego de conectarse, el evento usado sera message
  socket.on('message', message => {
    console.log(`Message recived from: ${message.user}`);
    // emitiendo evento de respuesta a todos los clientes, excepto al que emitio el mensaje desde el cliente
    socket.broadcast.emit('message', {
      body: message.message,
      from: message.user,
      id: socket.id,
    });
  });

  // emitir valores de los usuarios conectados
  emitActiveUsers(socket);

  // escuchando los usuarios que se desconectan
  socket.on('disconnect', () => {
    activeUsers--;
    console.log('Cliente desconectado, Usuarios activos ' + activeUsers);
    // emitir valores de los usuarios conectados
    emitActiveUsers(socket);
  });
});

app.get('/users', (req, resp)=>{ 
  console.log('activeUsers');
  resp.send({activeUsers})
});