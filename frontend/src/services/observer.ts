abstract class AbstractSubject {
  abstract attach(observer:Observer):void;
  abstract detach(observer:Observer):void;
  abstract notify(data:any):void;
}

abstract class AbstractObserver {
  abstract update(data:any):void;
}

export class Subject implements AbstractSubject{
  private observers: Observer[] = [];
  
  public attach(observer: Observer) {
    
    this.observers.push(observer);    
    console.log(this.observers.length, 'size');
  }
  
  public detach(observer: Observer) {
    this.observers = this.observers.filter(obs => obs !== observer);  
  }
  
  public notify(data: any) {
    console.log('cambios', this.observers.length);
    
    this.observers.forEach(observer => {
      console.log('ipdated observer');
      
      observer.update(data);      
    }); 
  }
}

export class Observer implements AbstractObserver {
  private callBack:(data:any)=>void
  constructor(callBack:(data:any)=>void){ this.callBack = callBack}
  update(data: any): void {
    console.log('observer class');
    
    this.callBack(data);
  }
}

// const subject = new SubjectOb();

// const observer1 = new ObserverOb();
// subject.attach(observer1);

// subject.notify("Data Update");

// // Received data: Data Update

// subject.detach(observer1);

// subject.notify("Another Update");

// Nothing printed