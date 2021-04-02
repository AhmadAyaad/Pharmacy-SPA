import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProductSupplierDto } from '../Dtos/IProductSupplierDto';

@Injectable({
  providedIn: 'root',
})
export class ProductSupplierService {
  orderItems = [];
  constructor(private http: HttpClient) {}

  createNewTransferOperation(productSupplier) {
    productSupplier['productTransfers'] = this.orderItems;
    productSupplier.productTransfers.map((item) => {
      delete item.medicineName;
      delete item.pharmacyName;
      return item;
    });

    return this.http.post(
      `${environment.apiUrl}productSupplier/create`,
      productSupplier
    );
  }
}
