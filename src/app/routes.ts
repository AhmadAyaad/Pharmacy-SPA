import { Routes } from '@angular/router';
import { MedicineFileUploadComponent } from './components/medicine-file-upload/medicine-file-upload.component';
import { CreateMedicineComponentComponent } from './components/medicine/create-medicine-component/create-medicine-component.component';
import { CreateSupplierComponent } from './components/supplier/create-supplier/create-supplier.component';
import { MedicineListComponent } from './components/medicine/medicine-list/medicine-list.component';


export const routes: Routes = [
  { path: 'medicine', component: CreateMedicineComponentComponent },
  { path: 'medicine/upload', component: MedicineFileUploadComponent },
  { path: 'supplier/create', component: CreateSupplierComponent },
  { path: 'medicines', component: MedicineListComponent },
];
