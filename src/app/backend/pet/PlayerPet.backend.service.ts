import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthContextService} from '@/app/backend/services/auth.context.service';
import {BackendUrlService} from '@/app/backend/services/backend.url.service';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class PlayerPetBackendService {
  constructor(private http: HttpClient, private authContextService: AuthContextService) {}

  // postUseItemForPet(petId: number, itemId: number) {
  //   console.log("send");
  //   return this.http.post(`${BackendUrlService.getBackendUrl()}/pet/${petId}/use_item/${itemId}`, {
  //     headers: this.authContextService.headerGetToken()
  //   }).subscribe();
  // }

  postUseItemForPet(petId: number, itemId: number) {
    console.log("send");
    return this.http.post(
      `${BackendUrlService.getBackendUrl()}/pet/${petId}/use_item/${itemId}`,
      {}, // empty body
      {
        headers: this.authContextService.headerGetToken()
      }
    ).subscribe({
      next: (res) => console.log('Item used successfully', res),
      error: (err) => console.error('Failed to use item', err)
    });
  }


}
