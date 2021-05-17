import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import { ISupplierDto } from 'src/app/Dtos/ISupplierDto';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css'],
})
export class SuppliersListComponent implements OnInit {
  faSort = faSort;
  constructor(
    private supplierSerivce: SupplierService,
    private alertifySerivce: AlertifyService,
    private router :Router
  ) {}
  suppliers: ISupplierDto[];
  supplierName: String;
  pageNumber: number = 1;
  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(): ISupplierDto[] {
    this.supplierSerivce.getSuppliers().subscribe(
      (res) => {
        console.log(res);
        this.suppliers = res;
      },
      (err) => {
        this.alertifySerivce.error(err);
      }
    );
    return this.suppliers;
  }

  search() {
    if (this.supplierName === '') this.ngOnInit();
    else {
      this.suppliers = this.suppliers.filter((res) => {
        return res.supplierName
          .toLocaleLowerCase()
          .match(this.supplierName.toLocaleLowerCase());
      });
    }
  }
  goToCreateSupplierPage(){
    this.router.navigate(['/supplier/create']);
  }
}
