import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarButtonsService {
  dataSubject = new BehaviorSubject<string>('main');

  setValue(value: string): void {
    this.dataSubject.next(value);
  }

  sideBarObservable(){
    return this.dataSubject.asObservable();
  }
}
