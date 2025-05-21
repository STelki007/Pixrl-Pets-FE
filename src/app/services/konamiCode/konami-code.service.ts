import { Injectable } from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';
import { map, bufferCount, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KonamiCodeService {
  private konamiCodeState = new BehaviorSubject<boolean>(false);
  private keySequence: string[] = [];
  private konamiCode: string = "schwerk"
  private resetTimeSec: number = 15000;

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
    fromEvent<KeyboardEvent>(window, 'keyup').subscribe(event => {
      this.keySequence.push(event.key);

      if (this.keySequence.length > this.konamiCode.length) {
        this.keySequence.shift();
      }

      if (this.keySequence.join('') === this.konamiCode) {
        this.setValue(true);
        alert(`Geheimer Code aktiviert: Nutzungsdauer ist: ${this.resetTimeSec} Sekunden`);

        setTimeout(() => {
          this.setValue(false);
        }, this.resetTimeSec);

        this.keySequence = [];
      }
    });
  }

}
