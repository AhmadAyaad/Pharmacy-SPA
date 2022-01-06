import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {largePharmaciesEndpoint} from './../../endpoints'
import { IPharmacy } from 'src/app/_models/IPharmacy';
@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  apiURL = `${environment.apiUrl}pharmacy`;
  constructor(private http: HttpClient) {}
  getLargePharmacies() {
    return this.http.get<IPharmacy[]>(
      `${this.apiURL}/${largePharmaciesEndpoint}`
    );
  }
  getPharmacyProduct(phmarmacyId: Number, productId: Number) {
    return this.http.get(
      `${this.apiURL}/pharmacyProducts/${phmarmacyId}/${productId}`
    );
  }
  getPharmacyProducts(pharmacyId: Number, pageIndex, pageSize) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageIndex);
    params = params.append('pageSize', pageSize);
    return this.http.get(`${this.apiURL}/pharmacyProducts/${pharmacyId}`, {
      params,
    });
  }
}
