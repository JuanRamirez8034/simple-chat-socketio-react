import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaCheck, FaImage, FaUser } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { LocalStorageService } from "../services/localstorage";

interface HeaderProps {
  signal?: ()=>void
}

const storage = new LocalStorageService();

export default function Header({signal}:HeaderProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [modalChangeName, setModalChangeName] = useState<boolean>(false);
  const [modalChangeBg, setModalChangeBg] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [imageBase, setImageBase] = useState<string|null|ArrayBuffer>(null);

  useEffect(()=>{
    setUserName(storage.getUserName);
  }, [])
  

  /**
   * resolver el proceso para cambiar el nombre de usuario
   */
  const handleProcessChangeName = () => {
    setToggle(false);
    setModalChangeName(true);
    setUserName(storage.getUserName);
  }
  
  /**
   * resolver el proceso para cambiar el fondo
   */
  const handleProcessChangeBg = () => {
    setModalChangeBg(true);
    setImageBase(null);
    setToggle(false);
  }

  /**
   * Resolver el envio del formulario para cargar nombre
   * @param e FormEvent<HTMLFormElement>
   */
  const handleSubmitChangeName = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(userName.trim() === '') return alert('El campo de nombre de usuario es requerido');
    storage.setUserName(userName);
    setModalChangeName(false);
  }

  /**
   * Cargar los valores del input del nombre en el estado de nombre de usuario
   * @param e ChangeEvent<HTMLInputElement>
   */
  const handleChangesInputName = (e:ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);

  /**
   * Resolver el cargado de archivo del input de archivos al estado
   * @param e ChangeEvent<HTMLInputElement>
   */
  const fileChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.currentTarget.files;

    if(!file || file.length <= 0) throw Error('Archivo no disponible');

    const reader = new FileReader();

    reader.onload = (e:ProgressEvent<FileReader>) => {
      const base64String = e.target?.result;
      if(!base64String) throw 'Error set file bg';
      setImageBase(base64String)
    }

    reader.readAsDataURL(file[0]);
    
  }

  /**
   * Resolver el envio del formulario de carga de archivo hacia el localstorage
   * @param e FormEvent<HTMLFormElement>
   */
  const handleSubmitImageBg = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!imageBase){
      const option = confirm('No se estableció una imagen, ¿desea cerrar esta ventana?');
      if(!option) return;
    }
    if(imageBase !== null) storage.setBackgroundUrl(imageBase);
    // emitiendo señal fuera del evento en caso de estar configurada
    imageBase && signal && signal();
    setImageBase(null);
    setModalChangeBg(false);
    e.currentTarget.reset();
  }

  return (
    <>
      {/* Cuerpo del header */}
      <div className=" w-full p-5 bg-slate-700 flex">
        <h1 className="text-slate-100 font-mono font-bold text-lg w-full flex items-center gap-4">Chatea <span><CiChat1 className="text-3xl" /></span></h1>
        <div className="relative">
          <button type="button" className={`text-slate-100 font-bold text-xl rounded-full hover:bg-slate-400 aspect-square px-2 ${toggle ? "bg-slate-400" :""}` } onClick={()=> {setToggle(value => !value)}}><CiMenuKebab /></button>
          <div className={`w-48 min-h-6 absolute z-10 right-0 bg-slate-400 rounded-xl shadow overflow-hidden -bottom-24 ${toggle ? "" :"hidden"}`}>
            <button 
              type="button" 
              className="w-full text-center text-base text-slate-100 p-3 hover:bg-slate-100 hover:text-slate-400 transition-all"
              onClick={handleProcessChangeName}
            >Cambiar nombre</button>
            <button 
              type="button" 
              className="w-full text-center text-base text-slate-100 p-3 hover:bg-slate-100 hover:text-slate-400 transition-all"
              onClick={handleProcessChangeBg}
            >Cambiar fondo</button>
          </div>
        </div>        
      </div>
      
      {/* modal para cambiar el nombre */}
      <div className={`absolute z-40 top-0 left-0 w-full max-h-full flex justify-center items-center bg-slate-700/40 transition-all ${modalChangeName ? "opacity-100" : "hidden opacity-0"}`} style={{"height": "100vh"}}>
        <div className="w-96 p-4 rounded-md shadow-md bg-slate-100 flex flex-col gap-10">
          <strong className="w-full text-center text-3xl text-slate-800">Cambiar nombre</strong>

          <form className="flex items-center w-full mx-auto" onSubmit={handleSubmitChangeName}>   
              <label  className="sr-only">Search</label>
              <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-800">
                      <FaUser className="text-slate-700" />
                  </div>
                  <input 
                    type="text" 
                    maxLength={25} 
                    id="simple-search" 
                    className=" border border-slate-400 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  outline-none" 
                    placeholder="Escribe un nombre de usuario" 
                    required 
                    onChange={handleChangesInputName}
                    value={userName}
                  />
              </div>
              <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-slate-100 bg-slate-700 rounded-lg border border-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                  <FaCheck />
              </button>
          </form>

        </div>
      </div>

      {/* modal para cambiar la imagen de fondo */}
      <div className={`absolute z-40 top-0 left-0 w-full max-h-full flex justify-center items-center bg-slate-700/40 transition-all ${modalChangeBg ? "opacity-100" : "hidden opacity-0"}`} style={{"height": "100vh"}}>
        <div className="w-96 p-4 rounded-md shadow-md bg-slate-100 flex flex-col gap-10">
          <strong className="w-full text-center text-3xl text-slate-800">Cambiar nombre</strong>

          <form className="flex items-center w-full mx-auto" onSubmit={handleSubmitImageBg}>   
              <label  className="sr-only">Search</label>
              <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-800">
                      <FaImage className="text-2xl text-slate-700" />
                  </div>
                  <input  
                    className=" border border-slate-400 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  outline-none" 
                    aria-describedby="file_input_help" 
                    id="file_input" 
                    type="file"
                    onChange={fileChange}
                    accept="image/png,image/jpg,iamge/jpeg"
                  />
              </div>
              <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-slate-100 bg-slate-700 rounded-lg border border-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                  <FaCheck />
              </button>
          </form>

        </div>
      </div>
    </>
  );
 }