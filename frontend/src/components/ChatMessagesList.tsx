import { useEffect, useRef, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import Message, { MessageModel } from "./Message";



export interface ChatMessagesListProps {
  messages: MessageModel[];
}


export default function ChatMessagesList({ messages }: ChatMessagesListProps) {

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [showForceBottonButton, setShowForceBottonButton]  = useState<boolean>(true);

  /**
   * Mover el scroll hasta el fondo siempre y cuando se cumpla el autoScroll en verdadero
   * @returns void
   */
  const scrollToBotton = (focer:boolean=false): void => {
    if(focer === false && !autoScroll) return;
    if(!scrollContainerRef || !scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({behavior: 'smooth', top: scrollContainerRef.current.scrollHeight});
  };

  /**
   * Determinar si el scroll esta al final y asignar en verdadero el autoscroll
   * @returns void
   */
  const handleSetAutoScroll = () => {
    if(scrollContainerRef === null || !scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isAtBottom = (scrollHeight - scrollTop) === clientHeight;
    setAutoScroll(isAtBottom);
    // determinar activar el boton si esta a 1000 de separacion del fondo
    const isAtBottomRange = (scrollHeight - scrollTop - 1000) <= clientHeight;
    setShowForceBottonButton(isAtBottomRange);    
  };

  // ejecutando el scroll hasta el fondo al agregar o eliminar menssages
  useEffect(scrollToBotton, [messages,]);

  // Agregar evento al contenedor con scroll
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleSetAutoScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleSetAutoScroll);
      }
    };
  }, []);



  return (
    <>
      <div className="flex flex-col justify-end w-full relative" style={{height: 'calc(100vh - 13.65rem)'}}>

        <button 
          onClick={() => scrollToBotton(true)}
          type="button"
          className={`absolute bottom-2 right-8 bg-blue-400 text-slate-100 p-4 text-3xl rounded-full shadow-lg transition-all active:bg-blue-500 ${(showForceBottonButton) ?  'hidden opacity-0' : 'block opacity-100' }`}
        ><FaArrowDown /></button>

        <div ref={scrollContainerRef} className="block w-full px-6 overflow-y-auto overflow-x-hidden">
          {
            messages.map((msg, index) => (
              <div
                key={index}
                className="block w-full"
              >
                <Message body={msg.body} from={msg.from} key={index} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}