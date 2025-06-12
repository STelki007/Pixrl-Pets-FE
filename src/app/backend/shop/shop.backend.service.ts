import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthContextService} from '@/app/backend/services/auth.context.service';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class ShopBackendService {

  constructor(
    private http: HttpClient,
    private tokenService: AuthContextService,
  ) {
  }

  sendBoughtItemsToPlayerInventory(id: number, amount: number) {
    return this.http.post(
      `http://localhost:8081/shop/buyItem/${id}/${amount}`,
      {},
      {headers: this.tokenService.headerGetToken()}
    );
  }


  buyPet(
    petId: number,
    onSuccess: (response: any) => void,
    onError: (error: any) => void
  ) {
    return this.http.post(`http://localhost:8081/shop/buyPet/` + petId, {}, {
      headers: this.tokenService.headerGetToken()
    }).subscribe({
      next: (response) => {
        onSuccess(response);
      },
      error: (error) => {
        console.error('Error:', error);
        onError(error);
      }
    });
  }

}
