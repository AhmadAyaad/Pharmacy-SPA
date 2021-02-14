import { Routes } from '@angular/router';
import { MedicineFileUploadComponent } from './components/medicine-file-upload/medicine-file-upload.component';
import { CreateMedicineComponentComponent } from './components/medicine/create-medicine-component/create-medicine-component.component';
import { CreateSupplierComponent } from './components/supplier/create-supplier/create-supplier.component';
import { MedicineListComponent } from './components/medicine/medicine-list/medicine-list.component';
import { SuppliersListComponent } from './components/supplier/suppliers-list/suppliers-list.component';
import { RecieveProductFromSupplierComponent } from './components/recieve-product-from-supplier/recieve-product-from-supplier.component';
import { PharmacyProductsListComponent } from './components/pharmacy/pharmacy-products-list/pharmacy-products-list.component';
export const routes: Routes = [
  { path: 'medicine', component: CreateMedicineComponentComponent },
  { path: 'medicine/upload', component: MedicineFileUploadComponent },
  { path: 'supplier/create', component: CreateSupplierComponent },
  { path: 'suppliers', component: SuppliersListComponent },
  { path: 'medicines', component: MedicineListComponent },
  { path: 'productSupplier', component: RecieveProductFromSupplierComponent },
  { path: 'pharmacy', component: PharmacyProductsListComponent },
];
