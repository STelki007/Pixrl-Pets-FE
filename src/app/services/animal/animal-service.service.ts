import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Pet} from '@components/animal-component/service/Pet';
import {TokenService} from '@services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AnimalServiceService {
  private employeesSubject: BehaviorSubject<Pet[]> = new BehaviorSubject<Pet[]>([]);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService) {
  }

  //refresh the employee list
  loadData(onSuccess?: (createdEmployee: Pet[]) => void, onError?: (error: any) => void): void {
    this.tokenService.getToken().then((token) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      this.http.get<Pet[]>('http://localhost:8081/employees', {headers}).subscribe(
        (employees) => {
          this.employeesSubject.next(employees);
          if (onSuccess) onSuccess(employees);
        },
        (error) => {
          if (onError) onError(error);
        }
      );
    });
  }

  // HTTP call to create employees
  public post(employee: Pet, onSuccess?: (createdEmployee: Pet) => void, onError?: (error: any) => void): Pet | null {
    this.tokenService.getToken().then((token: string) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      this.http.post<Pet>('http://localhost:8089/employees', this.mapEmployee(employee), {headers}).subscribe(
        (employee) => {
          if (onSuccess) onSuccess(employee);
          return employee;
        },
        (error) => {
          error.payload = employee;
          if (onError) onError(error);
        }
      );
    });
    return null;
  }

  // HTTP call to update employees
  public put(employeeId: number, employee: Pet, onSuccess?: (createdEmployee: Pet) => void, onError?: (error: any) => void): Pet | null {
    this.tokenService.getToken().then((token: string) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      this.http.put<Pet>(`http://localhost:8089/employees/${employeeId}`, this.mapEmployee(employee), {headers}).subscribe(
        (employee) => {
          if (onSuccess) onSuccess(employee);
          return employee;
        },
        (error) => {
          error.parameters = {employeeId: employeeId};
          error.payload = employee;
          if (onError) onError(error);
        }
      );
    });
    return null;
  }

// HTTP call to delete an employee
  public delete(employeeId: number, onSuccess?: () => void, onError?: (error: any) => void): void {
    this.tokenService.getToken().then((token: string) => {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      this.http.delete<void>(`http://localhost:8089/employees/${employeeId}`, {headers})
        .subscribe(
          () => {
            if (onSuccess) onSuccess();
          },
          (error) => {
            error.parameters = {employeeId: employeeId};
            if (onError) onError(error);
          }
        );
    });
  }

  // Get the observable that components can subscribe to
  getEmployees(): Observable<Pet[]> {
    return this.employeesSubject.asObservable();
  }

  private mapEmployee(animal: Pet): any {
    const animalCopy: any = structuredClone(animal);
    return animalCopy;
  }
}
