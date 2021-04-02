import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  selectedProductId: Number;
  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedProductId = this._activatedRoute.snapshot.queryParams.productId;
  }
}
