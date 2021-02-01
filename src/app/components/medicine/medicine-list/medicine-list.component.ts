import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/_services/medicine.service.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css'],
})
export class MedicineListComponent implements OnInit, OnDestroy {
  faSort = faSort;
  constructor(private medicineService: MedicineService) {}
  medicines;
  medicineName: string;
  subscriber;
  pageNumber: number = 1;
  ngOnInit(): void {
    this.subscriber = this.medicineService.getMedicines().subscribe((res) => {
      console.log(res);
      this.medicines = res;
    });
  }
  search() {
    if (this.medicineName === '') this.ngOnInit();
    else {
      this.medicines = this.medicines.filter((res) => {
        return res.medicineName
          .toLocaleLowerCase()
          .match(this.medicineName.toLocaleLowerCase());
      });
    }
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
