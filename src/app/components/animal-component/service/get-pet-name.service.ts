import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class GetPetNameService {
  private PetName = new BehaviorSubject<string>("cow");

  getValue(): Observable<string> {
    return this.PetName.asObservable();
  }

  setValue(value: string) {
    this.PetName.next(value);
  }
}
