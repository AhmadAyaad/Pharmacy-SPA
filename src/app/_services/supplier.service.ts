import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISupplierDto } from '../Dtos/ISupplierDto';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  createSupplier(supplier: ISupplierDto) {
    return this.http.post(
      'http://localhost:53147/api/supplier/create',
      supplier
    );
  }
}
