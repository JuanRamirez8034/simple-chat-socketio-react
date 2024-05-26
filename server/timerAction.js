

export class TimmerActions {

  #interval = null;
  #action = null;

  static getSecondsHour(hours=1){
    return Math.round(hours * 60 * 60);
  }

  setAction(callBack=null){
    this.#action = callBack;
  }

  setTimerInterval(seconds=1){
    const t = seconds * 1000;
    if(this.#interval !== null) this.clearInterval();
    this.#interval = setInterval(()=>{
      if(this.#action === null) return console.log('Accion a realizar en el temporizador, no definida');
      this.#action();
    }, t);
  }

  clearInterval(){
    clearInterval(this.#interval);
    this.#interval = null;
  }

  get exist(){
    return this.#interval !== null;
  }
}