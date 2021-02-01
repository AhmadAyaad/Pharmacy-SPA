import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { routes } from './routes';
import { AppComponent } from './app.component';
import { CreateMedicineComponentComponent } from './components/medicine/create-medicine-component/create-medicine-component.component';
import { MedicineFileUploadComponent } from './components/medicine-file-upload/medicine-file-upload.component';

import { MedicineService } from './_services/medicine.service.service';
import { UnitService } from './_services/unit.service';
import { SupplierService } from './_services/supplier.service';
import { CreateSupplierComponent } from './components/supplier/create-supplier/create-supplier.component';
import { MedicineListComponent } from './components/medicine/medicine-list/medicine-list.component';
import { SortDirective } from './directive/sort.directive';
import { AlertifyService } from './_services/alertify.service';
import { SuppliersListComponent } from './components/supplier/suppliers-list/suppliers-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateMedicineComponentComponent,
    MedicineFileUploadComponent,
    CreateSupplierComponent,
    MedicineListComponent,
    SortDirective,
    SuppliersListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
  ],
  providers: [MedicineService, UnitService, SupplierService, AlertifyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
