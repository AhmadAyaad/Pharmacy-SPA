import { ProductTypeEnum } from './../../../_models/ProductTypeEnum';
import { IProduct } from 'src/app/_models/IProduct';
import { ProductService } from './../../../_services/product.service';
import { Router } from '@angular/router';
import { ToastService } from './../../../_services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ITableColumns } from './../../../_models/ITableColumns';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastStateEnum } from 'src/app/_models/ToastStateEnum';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  columns: ITableColumns[];
  products: IProduct[];
  subscriber: Subscription;
  totalProductsCount: Number;
  rowsPerPageOptions: Array<Number> = [10, 25, 50];
  pageReport: string = 'Showing 0 to 0 of 0 items';
  @ViewChild('table') table;
  constructor(
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.setupTableSettings();
  }
  setupTableSettings() {
    this.columns = [
      {
        field: 'name',
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
        field: 'localCode',
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
    this.subscriber = this.productService
      .getPaignatedProducts(paginateEventData.rows, pageNumber)
      .subscribe((res: any) => {
        this.products = res.items;
        this.totalProductsCount = res.rowCount;
        this.pageReport = `Showing ${
          this.totalProductsCount > 0 ? '{first}' : 0
        } to {last} of {totalRecords} items`;
      });
  }
  onEditProduct(product: IProduct) {
    this.router.navigate(['/products/product'], {
      queryParams: { productId: product.id },
    });
  }

  onDeleteProduct(product: IProduct) {
    this.confirmationService.confirm({
      message: `هل تريد حذف${product.name} ؟`,
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe((res) => {
          this.toastService.showToastMessage(
            'حذف منتج',
            `تم حذف ${product.name} بنجاح`,
            ToastStateEnum.Success
          );
          this.table.reset();
        });
      },
    });
  }
  goToCreateMedicine() {
    this.router.navigate(['/products/add-product']);
  }
  getProductType(product: IProduct): string {
    switch (product.productType) {
      case ProductTypeEnum.Medicine:
        return 'دواء';
      case ProductTypeEnum.Equipment:
        return 'مستلزم طبى';
    }
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }
}
