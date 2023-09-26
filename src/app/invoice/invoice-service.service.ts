import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Iinvoice } from './iinvoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceServiceService {
  url = environment.apiUrl;
  apiurl = `${this.url}/Invoice`;
  constructor(private http: HttpClient) {}

  InvoicegetDetails(): Observable<Iinvoice[]> {
    return this.http.get<Iinvoice[]>(`${this.apiurl}/GetInvoice`);
  }

  InvoicecreateNewRecord(userForm: Iinvoice): Observable<Iinvoice> {
    return this.http.post<Iinvoice>(`${this.apiurl}/AddInvoice`, userForm, {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    });
  }

  InvoiceupdateRecord(userForm: Iinvoice): Observable<Iinvoice> {
    return this.http.put<Iinvoice>(
      `${this.apiurl}/UpdateInvoice/${userForm.invoiceId}`,
      userForm,
      {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      }
    );
  }
  
  updateIsActive(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiurl}/UpdateIsActive/${id}`,"");
  }

  Invoicedelete(id: number): Observable<Iinvoice> {
    return this.http.delete<Iinvoice>(`${this.apiurl}/DeleteInvoice/${id}`);
  }
}
