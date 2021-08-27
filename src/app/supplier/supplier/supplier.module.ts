import { SupplierRoutingModule } from './../supplier-routing/supplier-routing.module';
import { AddSupplierComponent } from './../components/add-supplier/add-supplier.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { SuppliersListComponent } from './../components/supplier-list/supplier-list.component';
import { SupplierEditComponent } from '../components/supplier-edit/supplier-edit.component';

@NgModule({
  declarations: [
    AddSupplierComponent,
    SuppliersListComponent,
    SupplierEditComponent,
  ],
  imports: [CommonModule, SharedModule, SupplierRoutingModule],
})
export class SupplierModule {}
