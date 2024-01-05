import { FormEvent, useEffect, useState } from 'react'
import io from 'socket.io-client';
import { FaLocationArrow } from "react-icons/fa";
import './App.css'

interface OnResponse {
  body: string;
  from: string;
}

// inicializando la conexion con el backend (en este caso se utiliza una config de proxy). Revisar 'vite.config.ts'
const socketio = io('/');

function App() {
  // mensaje actual
  const [message, setMessage] = useState<string>('');
  // arreglo de mensajes
  const [messages, setMessages] = useState<Array<OnResponse>>([]);
  
  // resover el envio del formulario
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(message.trim() === '') return;
    console.log('Send message');
    concactMessages({from: 'me', body: message});
    // emitiendo valor al backend
    socketio.emit('message', message);
    event.currentTarget.querySelector('input')!.value = ''
    setMessage('');
  };

  // ejecutando el la escucha del servidor al iniciar el componente
  useEffect(()=> {
    // escuchando el valor proveniente del backend
    socketio.on('message', (message:OnResponse) => {
      console.log(`Message response ${message}`);
      concactMessages(message); // agregando el mensaje nuevo proveniente del backend
    });
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
    <div className='h-screen bg-zinc-800 text-white flex justify-center items-center flex-col'>
      <form onSubmit={submitForm} className='bg-zinc-900 p-8 flex gap-4 rounded-t w-96 flex-col'>
        <h1 className='text-5xl font-bold mb'>Chat</h1>
        <div className='w-full flex flex-row gap-2'>
          <input 
            className='w-full border-2 border-zinc-500 p-2 text-zinc-900 rounded-md outline-none'
            type="text" 
            placeholder='Write you message...' 
            onChange={e => setMessage(e.target.value)}
          />
          <button type="submit" className='bg-slate-800 px-4 py-2 fw-bold text-lg font-bold active:bg-slate-700 rounded-md'><FaLocationArrow /></button>
        </div>
      </form>
      <div className='bg-zinc-600 border-zinc-900 border-4 p-2 rounded-b w-96 h-96 overflow-y-scroll'>
        <ul className='list-none block'>
          {
            messages.map((msg, index) => (
              <li 
                key={index}
                className={`p-4 rounded-xl table text-base my-2 ${msg.from === 'me' ? 'bg-slate-800' : 'bg-slate-700 ml-auto'}`}
              >
                <div className='flex flex-col gap-1 min-w-20'>
                  <span className='font-bold text-sm'>{msg.from}</span>
                  <span>{msg.body}</span>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App
