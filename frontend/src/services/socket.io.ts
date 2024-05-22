import { io } from "socket.io-client";


export class SocketIOService {
  private _socket = io('/');
  private static SocketIOInstance : SocketIOService | null = null;

  static create(){
    return (SocketIOService.SocketIOInstance === null) ? new SocketIOService() : SocketIOService.SocketIOInstance;
  }

  public get socket(){
    return this._socket
  }
}