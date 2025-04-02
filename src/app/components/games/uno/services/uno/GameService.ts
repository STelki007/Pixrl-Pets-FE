import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private isGameStarted = new BehaviorSubject<boolean>(false);

  setValue(value: boolean) {
    this.isGameStarted.next(value);
  }

  getValue() {
    return this.isGameStarted.asObservable();
  }


}
