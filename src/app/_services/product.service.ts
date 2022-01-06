import { IProduct } from 'src/app/_models/IProduct';
import { IProductDTO } from './../Dtos/IProductDTO';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = `${environment.apiUrl}product`;
  constructor(private http: HttpClient) {}

  addNewProduct(productDTO: IProductDTO) {
    return this.http.post(this.apiUrl, productDTO);
  }
  getPaignatedProducts(pageSize, pageIndex) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageIndex);
    params = params.append('pageSize', pageSize);
    return this.http.get<IProductDTO[]>(`${this.apiUrl}/paginated-products`, {
      params,
    });
  }
  getProduct(productId: Number) {
    return this.http.get<IProduct>(`${this.apiUrl}/${productId}`);
  }
  deleteProduct(productId: Number) {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
  updateProduct(updatedProduct: IProduct) {
    return this.http.put(this.apiUrl, updatedProduct);
  }
  getProductsWithUnitName() {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products-with-unit`);
  }
}
