import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPharmacy } from 'src/app/_models/IPharmacy';
import { PharmacyService } from 'src/app/_services/pharmacy.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  pharmacies: IPharmacy[];
  subscriber: Subscription;
  // items: MegaMenuItem[];
  items: MenuItem[];

  constructor(private pharmacyService: PharmacyService  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'المنتجات',
        routerLink: '/products/list',
      },
      {
        label: 'الموردين',
        routerLink: '/suppliers/list',
      },
      {
        label: 'عمليات',
        items: [
          { label: 'إستلام منتج من مورد', routerLink: '/productSupplier' },
          { label: 'تحويل منتج لصيدلية', routerLink: '/pharmacyTransfer' },
        ],
      },
    ];
    this.getLargePharmacies();
  }

  getLargePharmacies() {
    this.subscriber = this.pharmacyService
      .getLargePharmacies()
      .subscribe((res: IPharmacy[]) => {
        this.pharmacies = res;
      });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
