import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MedicineFileUploadComponent } from '../components/medicine-file-upload/medicine-file-upload.component';

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
  {
    path: 'operations',
    loadChildren: () =>
      import('../core/core/core.module').then((m) => m.CoreModule),
  },
  { path: 'medicine/upload', component: MedicineFileUploadComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
