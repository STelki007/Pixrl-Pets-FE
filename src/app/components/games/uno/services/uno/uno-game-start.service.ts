import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnoGameStart {
  private isStarted = new BehaviorSubject<boolean>(false);

  setValue(value: boolean) {
    this.isStarted.next(value);
  }

  getValue() {
    return this.isStarted.asObservable();
  }

}
