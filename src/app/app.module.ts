import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { MedicineFileUploadComponent } from './components/medicine-file-upload/medicine-file-upload.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { UnitService } from './_services/unit.service';
import { SupplierService } from './_services/supplier.service';
import { SortDirective } from './directive/sort.directive';
import { AlertifyService } from './_services/alertify.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropdownDirective } from './directive/dropdown.directive';
import { ProductSupplierService } from './_services/product-supplier.service';
import { SharedModule } from './shared/shared/shared.module';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';

export function authTokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    MedicineFileUploadComponent,
    SortDirective,
    NavbarComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDialogModule,
    SharedModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: authTokenGetter,
      },
    }),
  ],
  entryComponents: [],

  providers: [
    UnitService,
    SupplierService,
    AlertifyService,
    ProductSupplierService,
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
