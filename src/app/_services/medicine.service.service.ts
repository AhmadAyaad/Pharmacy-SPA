import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MedicineService {
  constructor(private http: HttpClient) {}

  createMedicine(medicine) {
    return this.http.post('http://localhost:53147/api/medicine/', medicine);
  }
}
