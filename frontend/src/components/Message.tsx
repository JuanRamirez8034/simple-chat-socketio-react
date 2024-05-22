
export interface MessageModel {
  body: string;
  from: string;
  id?: number;
}

interface MessageProps extends Pick<MessageModel, 'body'> {
  from: string | 'me';
}

export default function Message({from, body}:MessageProps) {
  return (
    <>
      <div className={`mt-4 flex min-w-40 max-w-96 flex-col rounded-md px-2 py-1 font-sans shadow-md ${from === 'me' ? 'ml-auto bg-slate-600' : 'bg-slate-500'}`}>
        <strong className="w-full text-slate-100">{from === 'me' ? 'Tú' : from}</strong>
        <p className="font-thin text-slate-100">{body}</p>
        <div className="flex justify-end">
          <small className="font-bold text-slate-100">{new Date().toISOString().slice(11,16)}</small>
        </div>
      </div>
    </>
  );
}
