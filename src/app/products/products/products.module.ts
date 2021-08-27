import { ProductsRoutingModule } from './../products-routing/products-routing.module';
import { ProductListComponent } from './../../products/components/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared/shared.module';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { ProductEditComponent } from '../components/product-edit/product-edit.component';

@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    ProductEditComponent,
  ],
  imports: [CommonModule, SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
