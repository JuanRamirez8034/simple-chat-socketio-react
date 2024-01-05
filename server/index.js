import { server } from "./app.js";
import os from 'os';

const port = 3000;

server.listen(port, ()=> {
  try {
    console.log(`Server on port ${port}`);
    console.log(`http://localhost:${port} \n or`); 
    console.log(`http://${os.networkInterfaces()['Ethernet'][1]['address']}:${port}`);
  } catch (error) {
    console.log('[-] Error al obtener infromacion del sistema');
  }
});