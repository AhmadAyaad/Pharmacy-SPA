import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPharmacy } from '../_models/IPharmacy';
import {
  pharamcyProductsEndpoint,
  largePharmaciesEndpoint,
} from '../endpoints';
@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  constructor(private http: HttpClient) {}
  queryParams = new HttpParams();
  getLargePharmacies() {
    return this.http.get<IPharmacy[]>(
      `${environment.apiUrl}${largePharmaciesEndpoint}`
    );
  }

  getPharmacyProducts(pharmacyName: string) {
    this.queryParams = this.queryParams.append('name', pharmacyName);
    return this.http.get(`${environment.apiUrl}${pharamcyProductsEndpoint}`, {
      params: this.queryParams,
    });
  }
}
