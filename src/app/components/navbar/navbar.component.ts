import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { IPharmacy } from 'src/app/_models/IPharmacy';
import { PharmacyService } from 'src/app/_services/pharmacy.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  pharmacies: IPharmacy[];
  subscriber: Subscription;
  constructor(
    private pharmacyService: PharmacyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
