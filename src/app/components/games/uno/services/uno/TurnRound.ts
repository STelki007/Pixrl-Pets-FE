import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TurnRound {
  private turn = new BehaviorSubject<boolean>(false);

  getValue(): Observable<boolean> {
    return this.turn.asObservable();
  }

  setValue(value: boolean) {
    if (this.turn.getValue() !== value) {
      this.turn.next(value);
    }
  }
}
