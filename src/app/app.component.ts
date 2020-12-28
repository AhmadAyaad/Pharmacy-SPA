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

  bla() {
    let v = this.service
      .createMedicine({
        MedicineCode: '#0215',
        MedicineName: 'ogminten3',
        SellingPrice: 100,
        ExpireDate: '2020-01-02',
        unitid: 1,
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
