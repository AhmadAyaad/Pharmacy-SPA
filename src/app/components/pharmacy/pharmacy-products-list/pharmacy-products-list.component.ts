import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PharmacyService } from 'src/app/_services/pharmacy.service';

@Component({
  selector: 'app-pharmacy-products-list',
  templateUrl: './pharmacy-products-list.component.html',
  styleUrls: ['./pharmacy-products-list.component.css'],
})
export class PharmacyProductsListComponent implements OnInit, OnDestroy {
  pharmacyName: string;
  pharmacyProducts;
  subscriber: Subscription;
  constructor(
    private pharmacyService: PharmacyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPharmacyName();
    this.getPharmacyProducts();
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
  getPharmacyName() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.pharmacyName = params['name'];
    });
  }

  getPharmacyProducts() {
    this.subscriber = this.pharmacyService
      .getPharmacyProducts(this.pharmacyName)
      .subscribe(
        (res) => {
          this.pharmacyProducts = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
