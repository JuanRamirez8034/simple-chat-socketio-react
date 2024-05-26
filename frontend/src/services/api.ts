import { MessageModel } from "../components/Message";


type ActiveUsersResponse = { activeUsers: number };

export class ApiService {
  /**
   * Obtener los usuarios activos en el servidor
   * @returns Promise<ActiveUsersResponse>
   */
  public static async getActiveUsers():Promise<ActiveUsersResponse>{
    try {
      const resp = await fetch('/users');
      const json = await resp.json() as ActiveUsersResponse;
      return json;
    } catch (error) {
      console.error('[service] Active users request error ' + error);
      return {activeUsers:0}
    }
  }

  /**
   * Obtener los mensajes disponibles
   * @returns Promise<MessageModel[]>
   */
  public static async getLastMessages():Promise<MessageModel[]>{
    try {
      const resp = await fetch('/users/getLastMessages');
      const json = await resp.json() as {lastMessages: MessageModel[]};
      return json.lastMessages;
    } catch (error) {
      console.error('[Service] Last messages request error')
      return[];
    }
  }
}