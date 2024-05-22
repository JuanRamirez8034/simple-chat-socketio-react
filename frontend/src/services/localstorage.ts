import { Subject } from "./observer";

export class LocalStorageService {
  
  private static LocalStorageInstance : LocalStorageService | null = null;
  public subject$ : Subject = new Subject();
  private readonly _keyUserName : string = 'username';
  private readonly _keyBackground: string = 'bg';

  static create(){
    return (LocalStorageService.LocalStorageInstance === null) ? new LocalStorageService() : LocalStorageService.LocalStorageInstance;
  }

  public setUserName(userName:string):void {
    localStorage.setItem(this._keyUserName, userName);
  }

  public get getUserName():string {
    try {
      return localStorage.getItem(this._keyUserName) ?? 'Anonimous';
    } catch (error) {
      return 'Anonimous';
    }
  }

  public setBackgroundUrl(url:string | ArrayBuffer):void {
    localStorage.setItem(this._keyBackground, `${url}`);
  }

  public get getBackgroundUrl(): string | null {
    try {
      return localStorage.getItem(this._keyBackground);
    } catch (error) {
      return null;
    }
  }
}