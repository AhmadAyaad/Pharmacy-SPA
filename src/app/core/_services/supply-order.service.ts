import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SupplyOrderService {
  private apiUrl: string = `${environment.apiUrl}supplyorder`;

  constructor(private http: HttpClient) {}
  recieveProductFromSupplier(productDetails) {
    return this.http.post(`${this.apiUrl}/supply-products`, productDetails);
  }
  getSupplyOrdersWithDetails() {
    return this.http.get(`${this.apiUrl}/supply-orders-details`);
  }
}
