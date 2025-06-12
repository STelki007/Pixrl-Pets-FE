import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {PetTypeDto} from '@services/animal/PetTypeDto';
import {AuthContextService} from '@/app/backend/services/auth.context.service';

@Injectable({
  providedIn: 'root',
})
export class PetTypeServiceService {
  private petSubject: BehaviorSubject<PetTypeDto[]> = new BehaviorSubject<PetTypeDto[]>([]);

  constructor(
    private http: HttpClient,
    private tokenService: AuthContextService) {
  }

  //refresh the pets list
  loadData(onSuccess?: (petTypes: PetTypeDto[]) => void, onError?: (error: any) => void): void {
    const headers = this.tokenService.headerGetToken()

    this.http.get<PetTypeDto[]>('http://localhost:8081/pet/notOwned', {headers}).subscribe(
      (pets) => {
        this.petSubject.next(pets);
        if (onSuccess) onSuccess(pets);
      },
      (error) => {
        if (onError) onError(error);
      }
    );
  }


  // Get the observable that components can subscribe to
  getPetTypes(): Observable<PetTypeDto[]> {
    return this.petSubject.asObservable();
  }

}
