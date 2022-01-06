import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPharmacy } from 'src/app/_models/IPharmacy';
import { MenuItem } from 'primeng/api';
import { PharmacyService } from 'src/app/core/_services/pharmacy.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  pharmacies: IPharmacy[];
  subscriber: Subscription;
  mganyPharmacyId: Number;
  ta2menPharmacyId: Number;
  nf2aPharmacyId: Number;
  // items: MegaMenuItem[];
  items: MenuItem[];

  constructor(private pharmacyService: PharmacyService) {}

  ngOnInit(): void {
    this.getLargePharmacies();
  }

  getLargePharmacies() {
    this.subscriber = this.pharmacyService
      .getLargePharmacies()
      .subscribe((res: IPharmacy[]) => {
        this.pharmacies = res;
        this.mganyPharmacyId = this.pharmacies?.find(
          (ph) => ph.name === 'مجانى'
        )?.id;
        this.ta2menPharmacyId = this.pharmacies?.find(
          (ph) => ph.name === 'تأمين'
        )?.id;
        this.nf2aPharmacyId = this.pharmacies?.find(
          (ph) => ph.name === 'نفقة'
        )?.id;
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
            label: 'أمور التوريد',
            items: [
              {
                label: 'إستلام منتج من مورد',
                routerLink: '/operations/supplier-order',
              },
              { label: 'تحويل منتج لصيدلية', routerLink: '/pharmacyTransfer' },
              { label: 'عرض ', routerLink: '/operations/supply-order-list' },
            ],
          },
          {
            label: 'أقسام',
            items: [
              {
                label: 'مجانى',
                routerLink: 'operations/pharmacy-products-list',
                queryParams: { pharmacyId: this.mganyPharmacyId },
              },
              {
                label: 'تأمين',

                routerLink: 'operations/pharmacy-products-list',
                queryParams: { pharmacyId: this.ta2menPharmacyId },
              },
              {
                label: 'نفقة',
                routerLink: 'operations/pharmacy-products-list',
                queryParams: { pharmacyId: this.nf2aPharmacyId },
              },
            ],
          },
        ];
      });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
