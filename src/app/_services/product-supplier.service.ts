import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IProductSupplierDto } from '../Dtos/IProductSupplierDto';

@Injectable({
  providedIn: 'root',
})
export class ProductSupplierService {
  constructor(private http: HttpClient) {}

  createNewTransferOperation(productSupplier: IProductSupplierDto) {
    return this.http.post(
      `${environment.apiUrl}productSupplier/create`,
      productSupplier
    );
  }
}
