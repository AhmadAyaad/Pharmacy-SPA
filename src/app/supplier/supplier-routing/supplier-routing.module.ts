import { AddSupplierComponent } from './../components/add-supplier/add-supplier.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersListComponent } from '../components/supplier-list/supplier-list.component';
import { SupplierEditComponent } from '../components/supplier-edit/supplier-edit.component';

const routes: Routes = [
  { path: 'add-supplier', component: AddSupplierComponent },
  { path: 'list', component: SuppliersListComponent },
  { path: 'supplier', component: SupplierEditComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule {}
