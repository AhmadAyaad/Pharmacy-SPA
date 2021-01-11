import { Component, OnInit } from '@angular/core';
import { MedicineService } from './_services/medicine.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pharmacy-SPA';
  constructor(private service: MedicineService) {}
  ngOnInit(): void {}
}
