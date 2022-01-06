import { Subscription } from 'rxjs';
import { IProduct } from './../../../_models/IProduct';
import { ITableColumns } from './../../../_models/ITableColumns';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PharmacyService } from '../../_services/pharmacy.service';
import { ProductTypeEnum } from 'src/app/_models/ProductTypeEnum';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-pharmacy-products-list',
  templateUrl: './pharmacy-products-list.component.html',
  styleUrls: ['./pharmacy-products-list.component.css'],
})
export class PharmacyProductsListComponent implements OnInit, OnDestroy {
  totalProductsCount: Number;
  rowsPerPageOptions: Array<Number> = [10, 25, 50];
  pageReport: string = 'Showing 0 to 0 of 0 items';
  @ViewChild('table') table;
  columns: ITableColumns[];
  selectedPharamcyId: Number;
  pharmacyProducts;
  subscription: Subscription;
  constructor(
    private pharmacyService: PharmacyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.selectedPharamcyId = res.pharmacyId;
      console.log(this.selectedPharamcyId);
    });
    this.subscription = this.router.events.subscribe((val) => {
      console.log({ val });
      if (val instanceof NavigationEnd) {
        this.loadPharmacyProductsLazy({ first: 0, rows: 10 });
      }
    });
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
        field: 'unitName',
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
      {
        field: 'totalQuantity',
        header: 'الكمية الكلية',
        sortable: false,
        width: '10%',
      },
      { field: 'actionButtons', header: '', sortable: false, width: '15%' },
    ];
  }
  loadPharmacyProductsLazy(paginateEventData) {
    const pageIndex = paginateEventData.first / paginateEventData.rows;
    this.getPharmacyProducts(pageIndex, paginateEventData.rows);
  }
  private getPharmacyProducts(pageIndex, pageSize) {
    this.pharmacyService
      .getPharmacyProducts(this.selectedPharamcyId, pageIndex, pageSize)
      .subscribe((res: any) => {
        this.pharmacyProducts = res.items;
        this.totalProductsCount = res.rowCount;
        this.pageReport = `Showing ${
          this.totalProductsCount > 0 ? '{first}' : 0
        } to {last} of {totalRecords} items`;
      });
  }

  openPharmacyProductDetails(pharmacyProduct) {
    this.router.navigate([`operations/pharmacy-product-details`], {
      queryParams: {
        productId: pharmacyProduct.id,
        pharmacyId: this.selectedPharamcyId,
      },
    });
  }
}
