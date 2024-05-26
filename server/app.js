import express from "express";
import http from 'http';
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { Server as SocketioServer } from "socket.io";
import { Messages } from "./messages.js";
import { TimmerActions } from "./timerAction.js";


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

const viableMessages = new Messages({limit:300});
const timerViableMsgs = new TimmerActions();
let activeUsers = 0;

const emitActiveUsers = (socket) => socket.broadcast.emit('activeUsers', activeUsers);

const emitMessage = (socket) => {
  socket.on('message', message => {
    // console.log(`Message recived from: ${message.user}`);
    const newMessage = {
      body: message.message,
      from: message.user,
      id: socket.id,
    };
    viableMessages.add(newMessage);
    // emitiendo evento de respuesta a todos los clientes, excepto al que emitio el mensaje desde el cliente
    socket.broadcast.emit('message', newMessage);
    console.log('Mesnages disponibles temporalmente: '+viableMessages.get.length);
  });
};

const deleteAllMessages = () => {
  viableMessages.deteleAll();
  console.log('Eliminando todos los mensajes');
};

// creando un evento (se dispara cuando sucede algo) para cuando suceda una conexion
io.on('connection', socket => {
  activeUsers++;
  console.log('Cliente conectado '+ socket.id + ', Usuarios activos ' + activeUsers);

  // si es el primer usuario en conectarse se creara la tarea de eliminar los mensajes en 1h
  if(activeUsers >= 1 && !timerViableMsgs.exist){
    const hoursTime = TimmerActions.getSecondsHour(1);
    console.log(`Eliminar mensajes luego de "${hoursTime} segundos"`);
    timerViableMsgs.setAction(deleteAllMessages);
    timerViableMsgs.setTimerInterval(hoursTime);
  }

  // escuchando eventos luego de conectarse, el evento usado sera message
  emitMessage(socket);

  // emitir valores de los usuarios conectados
  emitActiveUsers(socket);

  // escuchando los usuarios que se desconectan
  socket.on('disconnect', () => {
    activeUsers--;
    if(activeUsers <= 0 && timerViableMsgs.exist) {
      deleteAllMessages();
      timerViableMsgs.clearInterval();
    }
    console.log('Cliente desconectado, Usuarios activos ' + activeUsers);
    // emitir valores de los usuarios conectados
    emitActiveUsers(socket);
  });
});

// rutas
app.get('/users', (req, resp)=>{ 
  resp.json({activeUsers}).end();
});

app.get('/users/getLastMessages', (req, resp)=>{ 
  resp.status(200).json({lastMessages: viableMessages.get}).end();
});