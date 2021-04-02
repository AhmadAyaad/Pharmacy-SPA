import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/_services/medicine.service.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';

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
  subscriber: Subscription;
  response;
  totalPages;
  page = 1;
  ngOnInit(): void {
    this.getMedicines(1);
  }

  getMedicines(pageNumber?) {
    this.subscriber = this.medicineService
      .getMedicines(pageNumber)
      .subscribe((res: any) => {
        console.log(res);
        this.response = res;
        this.totalPages = this.response.totalRecords;
        this.medicines = this.response.data;
        // this.totalPages = res.totalPages;
        // this.medicines = res.data;
      });
  }
  pageChanged(pageNumber) {
    this.page = pageNumber;
    this.getMedicines(pageNumber);
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
