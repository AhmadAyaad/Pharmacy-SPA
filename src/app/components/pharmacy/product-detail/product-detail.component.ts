import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PharmacyService } from 'src/app/_services/pharmacy.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  selectedProductId: Number;
  selectedPharmacyId: Number;
  expireDates = new Map<any ,any >();
  productDetail :any;
  productName: string;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private pharmacyService: PharmacyService
  ) {}
  
  ngOnInit(): void {
    this.productDetail= this._activatedRoute.snapshot.queryParams
    console.log(this._activatedRoute.snapshot.queryParams)
    console.log(this.productDetail);
    console.log(  this.productDetail.pharamcyId,
      this.productDetail.id)
    this.pharmacyService
      .getPharamacyProductDetails(
        this.productDetail.pharamcyId,
        this.productDetail.id
      )
      .subscribe((res:any) => {
        res.forEach((productDetails: any) => {
          this.expireDates.set(productDetails.productsQuantity.expireDate, productDetails.productsQuantity.totalProductQuantity)
        })
        console.log(this.expireDates , this.productDetail)
      });
  }
}
