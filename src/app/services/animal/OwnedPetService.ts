import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pet } from '@components/animal-component/service/Pet';
import { TokenService } from '@services/token.service';
import { BackendUrlService } from '@/app/backend/services/backend.url.service';
import { AuthContextService } from '@/app/backend/services/auth.context.service';
import {PlayerPetDto} from '@services/animal/PlayerPetDto';

@Injectable({
  providedIn: 'root',
})
export class OwnedPetService {
  private ownedPetsSubject: BehaviorSubject<PlayerPetDto[]> = new BehaviorSubject<PlayerPetDto[]>([]);

  constructor(
    private http: HttpClient,
    private authContextService: AuthContextService
  ) {}

  /**
   * Loads the pets owned by the user from the backend and updates the observable.
   * Optionally invokes onSuccess or onError callbacks.
   */
  loadData(onSuccess?: (pets: PlayerPetDto[]) => void, onError?: (error: any) => void): void {
    this.http
      .get<PlayerPetDto[]>(`${BackendUrlService.getBackendUrl()}/pet/owned`, {
        headers: this.authContextService.headerGetToken(),
      })
      .subscribe({
        next: (pets: PlayerPetDto[]) => {
          this.ownedPetsSubject.next(pets);
          if (onSuccess) onSuccess(pets);
        },
        error: (err) => {
          console.error('Failed to load pets:', err);
          if (onError) onError(err);
        },
      });
  }

  getPets(): Observable<PlayerPetDto[]> {
    return this.ownedPetsSubject.asObservable();
  }

  private mapPets(animal: Pet): Pet {
    return structuredClone(animal);
  }
}
