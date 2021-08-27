import { ISupplier } from './../_models/ISupplier.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  apiUrl: string = `${environment.apiUrl}Supplier`;

  constructor(private http: HttpClient) {}
  createSupplier(supplier: ISupplier) {
    return this.http.post(`${this.apiUrl}`, supplier);
  }

  getPaginatedSuppliers(pageIndex, pageSize): Observable<ISupplier[]> {
    let params = new HttpParams();
    params = params.append('pageNumber', pageIndex);
    params = params.append('pageSize', pageSize);
    return this.http.get<ISupplier[]>(`${this.apiUrl}/paged-suppliers`);
  }
  getSupplier(supplierId: Number) {
    return this.http.get<ISupplier>(`${this.apiUrl}/${supplierId}`);
  }
  updateSupplier(updatedSupplier: ISupplier) {
    return this.http.put(this.apiUrl, updatedSupplier);
  }
  deleteSupplier(supplierId: Number) {
    return this.http.delete(`${this.apiUrl}/${supplierId}`);
  }
}
