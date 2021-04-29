import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPharmacy } from '../_models/IPharmacy';
import {
  pharamcyProductsEndpoint,
  largePharmaciesEndpoint,
  pharmacyProductDetails,
} from '../endpoints';
@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  queryParams = new HttpParams();
  orderItems: [];

  constructor(private http: HttpClient) {}

  getLargePharmacies() {
    return this.http.get<IPharmacy[]>(
      `${environment.apiUrl}${largePharmaciesEndpoint}`
    );
  }

  getPharmacyProducts(pharmacyid: Number) {
    return this.http.get(
      `${environment.apiUrl}${pharamcyProductsEndpoint}/${pharmacyid}`
    );
  }

  getPharamacyProductDetails(pharmacyId: Number, productId: Number) {
    return this.http.get(
      `${environment.apiUrl}${pharmacyProductDetails}/${productId}/${pharmacyId}`
    );
  }
  makeProductTransfer() {}
}
