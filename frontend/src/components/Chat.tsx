import { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import ChatForm from './ChatForm';
import ChatMessagesList from './ChatMessagesList';
import { SocketIOService } from '../services/socket.io';
import { LocalStorageService } from '../services/localstorage';
import { ApiService } from '../services/api';

interface OnResponse {
  body: string;
  from: string;
  id?: number;
}

// inicializando la conexion con el backend (en este caso se utiliza una config de proxy). Revisar 'vite.config.ts'
const socketio = new SocketIOService().socket;

/**
 * Obtener nombre desde el localStorage
 * @returns string
 */
const storage = new LocalStorageService();

export default function Chat() {
  // arreglo de mensajes
  const [messages, setMessages] = useState<Array<OnResponse>>([]);
  // usuarios activos
  const [activeUser, setActiveUser] = useState<number>(0);

  const sendMessage = (msj:string) => {
    socketio.emit('message', {message:msj, user: storage.getUserName});
    concactMessages({from: 'me', body: msj});
  }

  // ejecutando el la escucha del servidor al iniciar el componente
  useEffect(()=> {

    // escuchando el valor proveniente del backend
    socketio.on('message', (message:OnResponse) => {
      console.log(`Message response `, message);
      concactMessages(message); // agregando el mensaje nuevo proveniente del backend
    });

    // escuchando los usuarios conectados
    socketio.on('activeUsers', setActiveUser);
    // obteniendo los usuarios activos una unica vez
    (async () => {
      const {activeUsers} = await ApiService.getActiveUsers();
      setActiveUser(activeUsers)
    })();
    
    // apagando el evento proveniente del backend
    return  () => {
      socketio.off('message');
      // mostrando todos los mensajes por consola
      console.log(`All messages`);
      console.log(messages);
    }
  },[]);

  // funcion para agreagar los mensajes al arreglo de mensajes
  const concactMessages = (messageViable:OnResponse) => setMessages(state => [...state, messageViable]);

  return (
    <>
      <div 
        className='text-white flex w-full relative bg-slate-200' 
        style={{'height': 'calc(100vh - 4.75rem)', 'backgroundImage': `url("${storage.getBackgroundUrl}")`, "backgroundRepeat": "no-repeat", "backgroundPosition": "center center", "backgroundSize": "100% 100%"}}
      >
        <div aria-label='Usuarios activos' className='w-20 p-2 absolute left-2 top-2 bg-blue-300 rounded-md shadow-lg flex gap-4 justify-center items-center text-slate-700'>
          <FaUser /><span>{activeUser}</span>
        </div>
        <ChatMessagesList messages={messages}/>
        <div className='absolute bottom-0 p-4 w-full'>
          <ChatForm emitValues={sendMessage}/>
        </div>
      </div>
    </>
  );
}