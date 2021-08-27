import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MedicineFileUploadComponent } from '../components/medicine-file-upload/medicine-file-upload.component';
import { RecieveProductFromSupplierComponent } from '../components/recieve-product-from-supplier/recieve-product-from-supplier.component';
import { PharmacyProductsListComponent } from '../components/pharmacy/pharmacy-products-list/pharmacy-products-list.component';
import { PharmacyProductTransferComponent } from '../components/pharmacy/pharmacy-product-transfer/pharmacy-product-transfer.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('../products/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'suppliers',
    loadChildren: () =>
      import('../supplier/supplier/supplier.module').then(
        (m) => m.SupplierModule
      ),
  },
  { path: 'medicine/upload', component: MedicineFileUploadComponent },
  { path: 'productSupplier', component: RecieveProductFromSupplierComponent },
  { path: 'pharmacy', component: PharmacyProductsListComponent },
  { path: 'pharmacyTransfer', component: PharmacyProductTransferComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
