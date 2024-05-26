import { server } from "./app.js";
import os from 'os';

const port = 3000;

server.listen(port, ()=> {
  const errors = [];
  try {
    console.log(`Server on port ${port}`);
    console.table({'Nombre dispositivo': os.userInfo().username ?? 'Anonimous', 'Node version': process.version});
    console.log(`http://localhost:${port} \n or`); 
    console.log(`http://${os.networkInterfaces()['Ethernet'][1]['address']}:${port}`);
  } catch (error) {
    try {
      errors.push('[-] Direccion de conexion Ethernet no disponible');
      console.log(`http://${os.networkInterfaces()['Wi-Fi'][1]['address']}:${port}`);
    } catch (error) {
      errors.push('[-] Direccion de conexion Wifi no disponible');
    }
  }
  errors.forEach(e => console.log(e))
});