import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UnitService {
  constructor(private http: HttpClient) {}

  getUnits() {
    return this.http.get('http://localhost:53147/api/units');
  }
}
