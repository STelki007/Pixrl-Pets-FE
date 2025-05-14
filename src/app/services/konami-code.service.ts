import { Injectable } from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';
import { map, bufferCount, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KonamiCodeService {
  private konamiCodeState = new BehaviorSubject<boolean>(false);

  private konamiCode: string[] = [
    'ArrowUp', 'ArrowRight',
    'ArrowDown', 'ArrowLeft',

    'ArrowUp', 'ArrowRight',
    'ArrowDown', 'ArrowLeft',

  ];

  constructor() {
    this.listenForKonamiCode();
  }

  setValue(value: boolean) {
    this.konamiCodeState.next(value);
  }

  getValue() {
    return this.konamiCodeState.asObservable();
  }

  listenForKonamiCode(): void {
    fromEvent<KeyboardEvent>(window, 'keyup').pipe(
      map(e => e.key),
      bufferCount(this.konamiCode.length, 1),
      filter(keys => keys.join('') === this.konamiCode.join(''))
    ).subscribe(() => {
      this.setValue(true)
      alert("Konami Code aktiviert: Nutzungsdauer ist: 30 Sekunden");
   });
  }
}
