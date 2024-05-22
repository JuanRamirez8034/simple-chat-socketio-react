
interface EmotesBoxProps {
  onEmote: (emote: string) => void
}

export default function EmotesBox({onEmote}:EmotesBoxProps) {
  return (
    <>
      <div className="mx-auto mt-4 grid w-60 grid-cols-6 flex-wrap gap-4 rounded-md border p-2 shadow-lg bg-slate-100/90">
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("😎")}>😎</button>
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("🔥")}>🔥</button>
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("😉")}>😉</button>
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("💪")}>💪</button>
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("👀")}>👀</button>
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("👌")}>👌</button>
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("😒")}>😒</button>
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("✌")}>✌</button>
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("🤷‍♀️")}>🤷‍♀️</button>
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("🤷‍♂️")}>🤷‍♂️</button>
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("🙂")}>🙂</button>
        <button type="button" className="transition- p-1 hover:scale-125 hover:animate-pulse active:scale-95 active:animate-none" onClick={()=>onEmote("😥")}>😥</button>
      </div>
    </>
  );
}
