import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class ItemsBackendService{
  constructor(private http: HttpClient) {}

  getAllItems () {
    return this.http.get('http://localhost:8081/item');
  }
}
