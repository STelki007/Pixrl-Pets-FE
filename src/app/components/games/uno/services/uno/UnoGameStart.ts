import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Deck} from '@components/games/uno/services/uno/Deck';

@Injectable({
  providedIn: 'root',
})
export class UnoGameStart {
  private isStarted = new BehaviorSubject<boolean>(false);

  constructor(private deck: Deck) {}

  setValue(value: boolean) {
    this.isStarted.next(value);
  }

  getValue() {
    return this.isStarted.asObservable();
  }


}
