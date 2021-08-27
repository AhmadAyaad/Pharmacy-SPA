import { ToastStateEnum } from './../../../_models/ToastStateEnum';
import { ISupplier } from './../../../_models/ISupplier.model';
import { ToastService } from './../../../_services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ITableColumns } from './../../../_models/ITableColumns';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
})
export class SuppliersListComponent implements OnInit {
  columns: ITableColumns[];
  subscriber: Subscription;
  suppliers: ISupplier[];
  totalSuppliersCount: Number;
  rowsPerPageOptions: Array<Number> = [10, 25, 50];
  pageReport: string = 'Showing 0 to 0 of 0 items';
  @ViewChild('table') table;
  constructor(
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private supplierSerivce: SupplierService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.setupTableSettings();
  }

  setupTableSettings() {
    this.columns = [
      {
        field: 'name',
        header: 'إسم المورد',
        sortable: false,
        width: '10%',
      },
      {
        field: 'address',
        header: 'العنوان',
        sortable: false,
        width: '20%',
      },
      {
        field: 'phone',
        header: 'رقم الهاتف',
        sortable: false,
        width: '15%',
      },
      { field: 'actionButtons', header: '', sortable: false, width: '15%' },
    ];
  }

  loadSuppliersLazy(paginateEventData) {
    const pageNumber = paginateEventData.first / paginateEventData.rows;
    this.subscriber = this.supplierSerivce
      .getPaginatedSuppliers(paginateEventData.rows, pageNumber)
      .subscribe((res: any) => {
        this.suppliers = res.items;
        this.totalSuppliersCount = res.rowCount;
        this.pageReport = `Showing ${
          this.totalSuppliersCount > 0 ? '{first}' : 0
        } to {last} of {totalRecords} items`;
      });
  }
  onEditSupplier(supplier: ISupplier) {
    this.router.navigate(['/suppliers/supplier'], {
      queryParams: { supplierId: supplier.id },
    });
  }
  onDeleteSupplier(supplier: ISupplier) {
    this.confirmationService.confirm({
      message: `هل تريد حذف${supplier.name} ؟`,
      accept: () => {
        this.supplierSerivce.deleteSupplier(supplier.id).subscribe((res) => {
          this.toastService.showToastMessage(
            'حذف مورد',
            `تم حذف ${supplier.name} بنجاح`,
            ToastStateEnum.Success
          );
          this.table.reset();
        });
      },
    });
  }
  goToCreateSupplierPage() {
    this.router.navigate(['/suppliers/add-supplier']);
  }
}
