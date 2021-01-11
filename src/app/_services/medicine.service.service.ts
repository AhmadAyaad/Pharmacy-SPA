import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MedicineService {
  constructor(private http: HttpClient) {}

  createMedicine(medicine) {
    return this.http.post('http://localhost:53147/api/medicine/', medicine);
  }
  uploadFile(file) {
    return this.http.post('http://localhost:53147/api/Medicine/upload', file);
  }

  addUploadedMedicinestoDb(medicines:any) {
    return this.http.post(
      'http://localhost:53147/api/Medicine/addToDb',
      medicines
    );
  }
  getMedicines() {
    return this.http.get('http://localhost:53147/api/Medicine');
  }
}
