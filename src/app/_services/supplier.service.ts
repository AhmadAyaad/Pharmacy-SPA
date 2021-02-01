import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { ISupplierDto } from '../Dtos/ISupplierDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}
  createSupplier(supplier: ISupplierDto) {
    return this.http.post(`${environment.apiUrl}supplier/create`, supplier);
  }

  getSuppliers(): Observable<ISupplierDto[]> {
    return this.http.get<ISupplierDto[]>(`${environment.apiUrl}supplier`);
  }
}
