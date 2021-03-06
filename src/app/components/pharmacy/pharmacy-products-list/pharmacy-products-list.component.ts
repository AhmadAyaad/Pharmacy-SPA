import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { pharamcyProductsEndpoint } from 'src/app/endpoints';
import { PharmacyService } from 'src/app/_services/pharmacy.service';

@Component({
  selector: 'app-pharmacy-products-list',
  templateUrl: './pharmacy-products-list.component.html',
  styleUrls: ['./pharmacy-products-list.component.css'],
})
export class PharmacyProductsListComponent implements OnInit, OnDestroy {
  pharmacyId: Number;
  pharmacyProducts;
  subscriber: Subscription;
  constructor(
    private pharmacyService: PharmacyService,
    private activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.pharmacyId = params['id'];
      this.subscriber = this.pharmacyService
        .getPharmacyProducts(this.pharmacyId)
        .subscribe(
          (res: any) => {
            this.pharmacyProducts = res.data;
            console.log(this.pharmacyProducts);
          },
          (err) => {
            // console.log(err);
          }
        );
    });
  }

  ngOnInit(): void {
    this.getPharmacyId();
    this.getPharmacyProducts();
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
  getPharmacyId() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.pharmacyId = params['id'];
    });
  }

  getPharmacyProducts() {
    this.subscriber = this.pharmacyService
      .getPharmacyProducts(this.pharmacyId)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.pharmacyProducts = res.data;
        },
        (err) => {
          // console.log(err);
        }
      );
  }
  onSelectProduct(pharmacyProduct) {
    console.log(pharmacyProduct)
    pharmacyProduct['pharamcyId'] = this.pharmacyId;
    this._router.navigate([`/pharmacy/product`], { queryParams: pharmacyProduct,  skipLocationChange: true });

    // this._router.navigate([`/pharmacy/product`], {
    //   queryParams: {
    //     // productId: pharmacyProduct.id,
    //     // pharmacyId: this.pharmacyId,
    //     pharmacyProduct
    //     // medicineCode: pharmacyProduct.medicineCode,
    //     // medicineName: pharmacyProduct.medicineName,
    //     // nationalCode: pharmacyProduct.nationalCode,
    //     // price: pharmacyProduct.price,
    //     // productType: pharmacyProduct.productType,
    //     // unitName: pharmacyProduct.unitName,
    //     // totalQuantity:pharmacyProduct.totalQuantity
    //   },
    //   skipLocationChange:true
    // });
  }
}
