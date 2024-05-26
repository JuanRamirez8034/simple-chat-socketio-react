import { useEffect, useRef, useState } from "react";
import Message, { MessageModel } from "./Message";



export interface ChatMessagesListProps {
  messages: MessageModel[];
}


export default function ChatMessagesList({ messages }: ChatMessagesListProps) {

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  /**
   * Mover el scroll hasta el fondo siempre y cuando se cumpla el autoScroll en verdadero
   * @returns void
   */
  const scrollToBotton = (): void => {
    if(!autoScroll || !scrollContainerRef || !scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTo({behavior: 'smooth', top: scrollContainerRef.current.scrollHeight})
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
      <div className="list-none flex flex-col justify-end w-full" style={{"height": "75vh"}}>
        <div ref={scrollContainerRef} className="list-none block justify-end w-full px-6 overflow-y-scroll overflow-x-hidden h-100">
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