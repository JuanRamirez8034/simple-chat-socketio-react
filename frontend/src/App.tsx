
import './App.css';
import Header from './components/Header';
import Chat from './components/Chat';
import { useEffect, useState } from 'react';

// slate-100 400 700 800

function App() {

  const [modalShow, setModalShow] = useState<boolean>(false);

  // esto es temporal
  useEffect(()=>{
    const lcstgIndex = 'countMaria';
    let numberCount = localStorage.getItem(lcstgIndex);
    if(numberCount === null){
      numberCount = '1';
      localStorage.setItem(lcstgIndex, '0');
    }
    const activemodal = 7 > parseInt(numberCount);
    if(!activemodal) return;
    setModalShow(true);
    localStorage.setItem(lcstgIndex, parseInt(numberCount) + 1 +'');
  },[]);

  return (
    <>
      <Header />
      <Chat />
      {/* modal temporal */}
      <div className={`absolute z-40 top-0 left-0 w-full max-h-full flex justify-center items-center bg-slate-700/40 transition-all ${modalShow ? "opacity-100" : "hidden opacity-0"}`} style={{"height": "100vh"}}>
        <div className="w-96 p-4 rounded-md shadow-md bg-slate-100 flex flex-col gap-4">
          <strong className="w-full text-center text-3xl text-slate-800 mb-2">A petición de <br /> <span className='text-orange-600'>María Zambrano</span></strong>

          <div className="flex items-center justify-center w-full mx-auto mb-1">   
              <p className='text-center'>Querida el responsive ha sido arreglado <br />¿ya te funciona del todo bien?🙂<br /><br /> <b className='text-sm'>Este mensaje se mostrará solo tres veces</b></p>
          </div>

          <button onClick={()=>setModalShow(false)} type='button' className='rounded-lg bg-orange-700 p-2 font-medium text-orange-100 transition-all hover:bg-orange-800 mx-auto w-32'>Sí</button>
        </div>
      </div>
    </>
  )
}

export default App
