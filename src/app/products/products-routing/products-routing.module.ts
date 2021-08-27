import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductEditComponent } from '../components/product-edit/product-edit.component';

const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'list', component: ProductListComponent },
  { path: 'product', component: ProductEditComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
