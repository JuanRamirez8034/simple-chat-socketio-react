
export class Messages {

  #messages = [];
  #limit = 0;

  constructor({limit}={limit:100}){
    if(typeof limit !== 'number') throw 'El limite debe ser un numero entero';
    this.#limit = limit;
  }

  add({ body='noDefined', from= 'noDefined', id='' }){
    id !== '' && this.#messages.push({ body, from, id });
    (this.#messages.length > this.#limit) && this.#messages.shift();
  }

  get get(){
    return [...this.#messages];
  }

  deteleAll(){
    this.#messages = [];
    return this.#messages.length === 0;
  }

}