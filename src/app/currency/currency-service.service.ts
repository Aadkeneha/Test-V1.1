import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Icurrency } from './icurrency';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyServiceService {
  url = environment.apiUrl;
  apiurl = `${this.url}/Currency`;

  constructor(private http: HttpClient) {}

  getDetails(): Observable<Icurrency[]> {
    return this.http.get<Icurrency[]>(`${this.apiurl}/GetCurrency`);
  }

  createNewRecord(userForm: Icurrency): Observable<Icurrency> {
    return this.http.post<Icurrency>(`${this.apiurl}/AddCurrency`, userForm, {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    });
  }

  updateRecord(userForm: Icurrency): Observable<Icurrency> {
    return this.http.put<Icurrency>(
      `${this.apiurl}/UpdateCurrency/${userForm.currencyId}`,
      userForm,
      {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      }
    );
  }

  delete(id: number): Observable<Icurrency> {
    return this.http.delete<Icurrency>(`${this.apiurl}/DeleteCurrency/${id}`);
  }
}
