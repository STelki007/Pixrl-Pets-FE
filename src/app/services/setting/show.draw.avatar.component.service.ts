import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowDrawAvatarComponentService {
  private modalState = new BehaviorSubject<boolean>(false);

  setValue(value: boolean) {
    this.modalState.next(value);
  }

  getValue() {
    return this.modalState.asObservable();
  }


}
