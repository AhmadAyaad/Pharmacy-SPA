import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UnitService {
  apiUrl = `${environment.apiUrl}units`;

  constructor(private http: HttpClient) {}

  getUnits() {
    return this.http.get(`${this.apiUrl}`);
  }
}
