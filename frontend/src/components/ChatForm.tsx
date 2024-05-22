import { FormEvent, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaFaceAngry } from "react-icons/fa6";
import { RiAttachment2 } from "react-icons/ri";
import EmotesBox from "./EmotesBox";

export interface ChatFormProps {
  className?: string;
  emitValues: (messaje:string)=>void;
}

export default function ChatForm({className, emitValues}:ChatFormProps) {
  // mensaje actual
  const [message, setMessage] = useState<string>('');
  const [showEmotesBox, setShowEmotesBox] = useState<boolean>(false);

  
  // resover el envio del formulario
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(message.trim() === '') return;
    emitValues(message.trim());
    event.currentTarget.querySelector('textarea')!.value = ''
    setMessage('');
  }

  const onEmote = (emote:string) => {
    setMessage(msj => msj + emote);
  }

  return (
    <>
      {/* <!-- FORMULARIO DEL CHAT --> */}
      <form onSubmit={submitForm} className={`relative border-1 mx-auto flex h-auto w-full flex-col gap-4 rounded-md border border-slate-400 bg-white p-2 shadow-md ${className}`}>
        <div className={`absolute -top-32 -left-0 ${(showEmotesBox) ? '' : 'hidden'}`}>
          <EmotesBox onEmote={onEmote} />
        </div>
        <textarea 
          cols={5} 
          className="textbase max-h-20 min-h-8 w-full text-slate-700 resize-none bg-transparent font-mono outline-none" 
          placeholder="Escribir mensaje"
          onChange={e => setMessage(e.target.value)}
          value={message}
        ></textarea>
        <div className="flex w-full justify-between">
          <div className="flex gap-4 pl-3">
            <button type="button" className="text-slate-400 transition-all hover:text-slate-700" onClick={()=>alert('Mano esto aun no tiene vida')}>
              <RiAttachment2 />
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" width="22px"><path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd"></path></svg> */}
            </button>
            <button type="button" className="text-slate-400 transition-all hover:text-slate-700" onClick={()=>setShowEmotesBox(value => !value)}>
              <FaFaceAngry />
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" width="22px" className="nz sb up"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-4.464a.75.75 0 10-1.061-1.061 3.5 3.5 0 01-4.95 0 .75.75 0 00-1.06 1.06 5 5 0 007.07 0zM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5z" clip-rule="evenodd"></path></svg> */}
            </button>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-slate-700 px-4 py-2 font-medium text-slate-100 transition-all hover:bg-slate-800 flex gap-4 items-center"
          > <FaRegPaperPlane /> Enviar</button>
        </div>
      </form>
    </>
  );
}
