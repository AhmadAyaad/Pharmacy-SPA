import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { MedicineFileUploadComponent } from './components/medicine-file-upload/medicine-file-upload.component';

import { MedicineService } from './_services/medicine.service.service';
import { UnitService } from './_services/unit.service';
import { SupplierService } from './_services/supplier.service';
import { SortDirective } from './directive/sort.directive';
import { AlertifyService } from './_services/alertify.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecieveProductFromSupplierComponent } from './components/recieve-product-from-supplier/recieve-product-from-supplier.component';
import { PharmacyProductsListComponent } from './components/pharmacy/pharmacy-products-list/pharmacy-products-list.component';
import { DropdownDirective } from './directive/dropdown.directive';
import { ProductItemsModalComponent } from './components/recieve-product-from-supplier/product-items-modal/product-items-modal.component';
import { ProductSupplierService } from './_services/product-supplier.service';
import { PharmacyProductTransferComponent } from './components/pharmacy/pharmacy-product-transfer/pharmacy-product-transfer.component';
import { PharmacyTransferItemsModalComponent } from './components/pharmacy/pharmacy-transfer-items-modal/pharmacy-transfer-items-modal.component';
import { ProductDetailComponent } from './components/pharmacy/product-detail/product-detail.component';
import { SharedModule } from './shared/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    MedicineFileUploadComponent,
    SortDirective,
    NavbarComponent,
    RecieveProductFromSupplierComponent,
    PharmacyProductsListComponent,
    ProductItemsModalComponent,
    PharmacyProductTransferComponent,
    PharmacyTransferItemsModalComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    SharedModule,
  ],
  entryComponents: [
    ProductItemsModalComponent,
    PharmacyTransferItemsModalComponent,
  ],

  providers: [
    MedicineService,
    UnitService,
    SupplierService,
    AlertifyService,
    ProductSupplierService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
