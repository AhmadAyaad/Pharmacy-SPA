import { PharmacyProductDetailsComponent } from './../components/pharmacy-product-details/pharmacy-product-details.component';
import { ReceiveProductFromSupplierComponent } from './../components/receive-product-from-supplier/receive-product-from-supplier.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PharmacyProductsListComponent } from '../components/pharmacy-products-list/pharmacy-products-list.component';
import { LoginComponent } from '../components/login/login.component';
import { SupplyOrderListComponent } from '../components/supply-order-list/supply-order-list.component';

const routes: Routes = [
  { path: 'supplier-order', component: ReceiveProductFromSupplierComponent },
  { path: 'pharmacy-products-list', component: PharmacyProductsListComponent },
  {
    path: 'pharmacy-product-details',
    component: PharmacyProductDetailsComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'supply-order-list', component: SupplyOrderListComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CoreRoutingModule {}
