import { useEffect, useRef } from "react";
import Message, { MessageModel } from "./Message";



export interface ChatMessagesListProps {
  messages: MessageModel[];
}


export default function ChatMessagesList({ messages }: ChatMessagesListProps) {

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    console.log('Implementar lo del scroll que no funcionaaaaa');
    
     
  },[messages,])

  return (
    <>
      <div ref={scrollRef} className="list-none flex flex-col justify-end w-full" style={{"height": "75vh"}}>
        <ul className="list-none block justify-end w-full px-6 overflow-y-scroll overflow-x-hidden h-100">
          {
            messages.map((msg, index) => (
              <li
                key={index}
                className="block w-full"
              >
                <Message body={msg.body} from={msg.from} key={index} />
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}