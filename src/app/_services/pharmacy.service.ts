import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPharmacy } from '../_models/IPharmacy';

@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  constructor(private http: HttpClient) {}

  getLargePharmacies() {
    return this.http.get<IPharmacy[]>(`${environment.apiUrl}largePharmacies`);
  }
}
