

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
}