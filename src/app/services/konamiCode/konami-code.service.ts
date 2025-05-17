import { Injectable } from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';
import { map, bufferCount, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KonamiCodeService {
  private konamiCodeState = new BehaviorSubject<boolean>(false);

  private konamiCode: string = "schwerk"

  constructor() {
    this.konamiCodeProcess();
  }

  setValue(value: boolean) {
    this.konamiCodeState.next(value);
  }

  getValue() {
    return this.konamiCodeState.asObservable();
  }

  konamiCodeProcess(): void {
    fromEvent<KeyboardEvent>(window, 'keyup').pipe(
      map(e => e.key),
      bufferCount(this.konamiCode.length, 1),
      filter(keys => keys.join('') === this.konamiCode)
    ).subscribe(() => {
      this.setValue(true)
      alert("Geheimer Code aktiviert: Nutzungsdauer ist: 30 Sekunden");
   });
  }
}
