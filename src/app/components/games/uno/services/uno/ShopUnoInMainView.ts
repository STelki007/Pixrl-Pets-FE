import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckUno {
  private isUnoClicked = new BehaviorSubject<boolean>(false);

  setValue(value: boolean) {
    this.isUnoClicked.next(value);
  }

  getValue() {
    return this.isUnoClicked.asObservable();
  }


}
