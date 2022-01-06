import { PharmacyProductDetailsComponent } from './../components/pharmacy-product-details/pharmacy-product-details.component';
import { DialogService } from 'primeng/dynamicdialog';
import { SupplierOrderModalComponent } from './../components/supplier-order-modal/supplier-order-modal.component';
import { ReceiveProductFromSupplierComponent } from './../components/receive-product-from-supplier/receive-product-from-supplier.component';
import { CoreRoutingModule } from './../core-routing/core-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { PharmacyProductsListComponent } from 'src/app/core/components/pharmacy-products-list/pharmacy-products-list.component';
import { LoginComponent } from '../components/login/login.component';
import { SupplyOrderListComponent } from '../components/supply-order-list/supply-order-list.component';

@NgModule({
  declarations: [
    ReceiveProductFromSupplierComponent,
    SupplierOrderModalComponent,
    PharmacyProductsListComponent,
    PharmacyProductDetailsComponent,
    LoginComponent,
    SupplyOrderListComponent
  ],
  imports: [CommonModule, SharedModule, CoreRoutingModule],
  providers:[],
  entryComponents: [SupplierOrderModalComponent],
})
export class CoreModule {}
