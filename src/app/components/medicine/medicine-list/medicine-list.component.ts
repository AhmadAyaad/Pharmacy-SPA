import { IMedicine, ProductType } from './../../../_models/IMedicine';
import { ToastService } from './../../../_services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { ITableColumns } from './../../../_models/ITableColumns';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MedicineService } from 'src/app/_services/medicine.service.service';
import { Subscription } from 'rxjs';
import { ToastStateEnum } from 'src/app/_models/ToastStateEnum';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css'],
})
export class MedicineListComponent implements OnInit, OnDestroy {
  constructor(
    private medicineService: MedicineService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private router: Router
  ) {}

  columns: ITableColumns[];
  medicines: IMedicine[];
  medicineName: string;
  subscriber: Subscription;
  totalProductsCount: Number;
  rowsPerPageOptions: Array<Number> = [10, 25, 50];
  pageReport: string = 'Showing 0 to 0 of 0 items';

  @ViewChild('table') table;

  ngOnInit(): void {
    this.setupTableSettings();
  }

  setupTableSettings() {
    this.columns = [
      {
        field: 'medicineName',
        header: 'إسم المنتج',
        sortable: false,
        width: '10%',
      },
      {
        field: 'unit',
        header: 'الوحدة',
        sortable: false,
        width: '10%',
      },
      {
        field: 'medicineCode',
        header: 'الكود المحلى',
        sortable: false,
        width: '10%',
      },
      {
        field: 'nationalCode',
        header: 'الكود الدولى',
        sortable: false,
        width: '10%',
      },
      
      {
        field: 'productType',
        header: 'نوع المنتج',
        sortable: false,
        width: '10%',
      },
      { field: 'actionButtons', header: '', sortable: false, width: '15%' },
    ];
  }

  loadProductLazy(paginateEventData) {
    const pageNumber = paginateEventData.first / paginateEventData.rows;
    this.subscriber = this.medicineService
      .getMedicines(pageNumber, paginateEventData.rows)
      .subscribe((res: any) => {
        console.log(res);
        this.totalProductsCount = res.totalRecords;
        this.medicines = res.data;
        this.pageReport = `Showing ${
          this.totalProductsCount > 0 ? '{first}' : 0
        } to {last} of {totalRecords} items`;
      });
  }
  onEditProduct(product: IMedicine) {
    console.log(product.medicineName);
  }

  onDeleteProduct(product: IMedicine) {
    this.confirmationService.confirm({
      message: `هل تريد حذف${product.medicineName} ؟`,
      accept: () => {
        this.medicineService
          .deleteProduct(product.medicineId)
          .subscribe((res) => {
            this.toastService.showToastMessage(
              'حذف منتج',
              `تم حذف ${product.medicineName} بنجاح`,
              5000,
              ToastStateEnum.Success
            );
            console.log(res);
            this.table.reset();
          });
      },
    });
  }
  getProductType(product:IMedicine):string {
    switch(product.productType){
      case ProductType.Medicine:
      return 'دواء';
      case ProductType.Equiment:
        return 'مستلزم طبى';
    }
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
  goToCreateMedicine() {
    this.router.navigate(['/medicine']);
  }
  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }
}
