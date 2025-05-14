import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Pet} from '@components/animal-component/service/Pet';

@Injectable({
  providedIn: 'root'
})
export class SelectedAnimalServiceService {
  private selectedAnimalSubject:BehaviorSubject<Pet|null> = new BehaviorSubject<Pet|null>(null);

  selectedAnimal$:Observable<Pet|null> = this.selectedAnimalSubject.asObservable();

  setSelectedAnimal(animal: Pet): void {
    this.selectedAnimalSubject.next(animal);
  }

  getSelectedAnimal(): Pet | null {
    return this.selectedAnimalSubject.getValue();
  }

  getSelectedAnimalObservable(): Observable<Pet|null> {
    return this.selectedAnimal$;
  }

  clear(): void {
    this.selectedAnimalSubject.next(null);
  }
}
