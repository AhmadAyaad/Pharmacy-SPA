import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable()
export class MedicineService {
  constructor(private http: HttpClient) {}

  createMedicine(medicine) {
    return this.http.post(`${environment.apiUrl}medicine`, medicine);
  }
  uploadFile(file) {
    return this.http.post(`${environment.apiUrl}medicine/upload`, file);
  }

  addUploadedMedicinestoDb(medicines: any) {
    return this.http.post(
      'http://localhost:53147/api/Medicine/addToDb',
      medicines
    );
  }
  getMedicines() {
    return this.http.get(`${environment.apiUrl}medicine`);
  }
}
