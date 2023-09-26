import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ivendor } from './ivendor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorServiceService {

  url = environment.apiUrl;


  apiurl = `${this.url}/Vendor`;

  constructor(private http: HttpClient) {}


  getDetails(): Observable<Ivendor[]> {
    return this.http.get<Ivendor[]>(`${this.apiurl}/GetVendor`);
  }

  createNewRecord(userForm: Ivendor): Observable<Ivendor> {
    return this.http.post<Ivendor>(`${this.apiurl}/AddVendor`, userForm, 
    {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    });
  }

  updateRecord(userForm: Ivendor): Observable<Ivendor> {
    return this.http.put<Ivendor>(
      `${this.apiurl}/UpdateVendor/${userForm.vendorId}`,
      userForm,
      {
        headers: new HttpHeaders({ 'content-type': 'application/json' })
      }
    );
  }

  updateIsActive(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiurl}/UpdateIsActive/${id}`,"");
  }

  delete(id: number): Observable<Ivendor> {
    return this.http.delete<Ivendor>(`${this.apiurl}/DeleteVendor/${id}`);
  }
}
