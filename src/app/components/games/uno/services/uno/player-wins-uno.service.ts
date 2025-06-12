import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class PlayerWinsUnoService {
  private behaviorSubject = new BehaviorSubject<boolean>(false);

  getValue(): Observable<boolean> {
    return this.behaviorSubject.asObservable();
  }

  setValue(value: boolean) {
    this.behaviorSubject.next(value);
  }
}
