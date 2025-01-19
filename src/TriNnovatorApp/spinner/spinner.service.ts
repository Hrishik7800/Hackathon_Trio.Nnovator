import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private count = 0;
  private spinnerS = new BehaviorSubject<string>('');

  constructor() { }

  getSpinnerObserver(): Observable<string>{
    return this.spinnerS.asObservable();
  }

  requestStarted(){
    if(++this.count === 1){
      this.spinnerS.next('start');
    }
  }

  requestEnded(){
    if(this.count===0 || --this.count===0){
      this.spinnerS.next('stop');
    }
  }

  //due to som calamities reset spinner

  resetSpinner(){
    this.count = 0;
    this.spinnerS.next('stop');
  }
}
