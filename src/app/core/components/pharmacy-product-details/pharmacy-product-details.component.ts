import { PharmacyService } from '../../_services/pharmacy.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-pharmacy-product-details',
  templateUrl: './pharmacy-product-details.component.html',
  styleUrls: ['./pharmacy-product-details.component.css'],
})
export class PharmacyProductDetailsComponent implements OnInit {
  pharmacyProductDetails;
  constructor(
    private route: ActivatedRoute,
    private pharmacyService: PharmacyService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.pharmacyService
        .getPharmacyProduct(res.pharmacyId, res.productId)
        .subscribe((data) => {
          this.pharmacyProductDetails = data;
        });
    });
  }

  formatExpireDate(expireDate) {
    return moment(expireDate).format('L');
  }
}
