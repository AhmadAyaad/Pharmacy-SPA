import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

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
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecieveProductFromSupplierComponent } from './components/recieve-product-from-supplier/recieve-product-from-supplier.component';
import { PharmacyProductsListComponent } from './components/pharmacy/pharmacy-products-list/pharmacy-products-list.component';
import { DropdownDirective } from './directive/dropdown.directive';
import { ProductItemsModalComponent } from './components/recieve-product-from-supplier/product-items-modal/product-items-modal.component';
import { ProductSupplierService } from './_services/product-supplier.service';
import { PharmacyProductTransferComponent } from './components/pharmacy/pharmacy-product-transfer/pharmacy-product-transfer.component';
import { PharmacyTransferItemsModalComponent } from './components/pharmacy/pharmacy-transfer-items-modal/pharmacy-transfer-items-modal.component';
import { ProductDetailComponent } from './components/pharmacy/product-detail/product-detail.component';

import {MegaMenuModule} from 'primeng/megamenu';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';

import {ConfirmationService} from 'primeng/api'
import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    CreateMedicineComponentComponent,
    MedicineFileUploadComponent,
    CreateSupplierComponent,
    MedicineListComponent,
    SortDirective,
    SuppliersListComponent,
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
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MegaMenuModule,
    ButtonModule,
    MenubarModule,
    TableModule,
    PanelModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
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
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
