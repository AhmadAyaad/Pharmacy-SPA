import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import { IProductSupplierDto } from 'src/app/Dtos/IProductSupplierDto';
import { IProduct } from 'src/app/_models/IProduct';
import { IPharmacy } from 'src/app/_models/IPharmacy';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MedicineService } from 'src/app/_services/medicine.service.service';
import { PharmacyService } from 'src/app/_services/pharmacy.service';
import { ProductSupplierService } from 'src/app/_services/product-supplier.service';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ProductItemsModalComponent } from './product-items-modal/product-items-modal.component';

@Component({
  selector: 'app-recieve-product-from-supplier',
  templateUrl: './recieve-product-from-supplier.component.html',
  styleUrls: ['./recieve-product-from-supplier.component.css'],
})
export class RecieveProductFromSupplierComponent implements OnInit {
  productFromSupplierForm: FormGroup;
  productSupplier: IProductSupplierDto;
  suppliers;
  products: IProduct[];
  largePharmacies: IPharmacy[];
  submitted = false;
  radioButtonClicked = false;
  faPlusSquare = faPlusSquare;
  constructor(
    private supplierService: SupplierService,
    private productService: MedicineService,
    private pharmacyService: PharmacyService,
    public productSupplierService: ProductSupplierService,
    private alertifyService: AlertifyService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createProductSupplierForm();
    // this.getSuppliers();
    this.getProducts();
    this.getLargePharmacies();
  }

  addOrUpdateItem(orderItemIndex) {
    let config = new MatDialogConfig();
    config.width = '50%';
    config.data = { orderItemIndex };
    this.matDialog.open(ProductItemsModalComponent, config);
  }

  // getSuppliers() {
  //   this.supplierService.getSuppliers().subscribe(
  //     (res: ISupplierDto[]) => {
  //       this.suppliers = res;
  //     },
  //     (err) => {
  //       this.alertifyService.error(err);
  //     }
  //   );
  // }

  getProducts() {
    this.productService
      .getMedicinesWithUnitNames()
      .subscribe((res: IProduct[]) => {
        this.products = res;
      });
  }

  getLargePharmacies() {
    this.pharmacyService.getLargePharmacies().subscribe((res: IPharmacy[]) => {
      this.largePharmacies = res;
    });
  }

  createProductSupplierForm() {
    this.productFromSupplierForm = new FormGroup({
      importOrderNumber: new FormControl('', Validators.required),
      supplyOrderNumber: new FormControl('', Validators.required),
      approvalNumber: new FormControl('', Validators.required),
      purchaseFee: new FormControl('', Validators.required),
      supplierId: new FormControl('', Validators.required),
    });
  }

  handleSelectMedinceType() {
    this.radioButtonClicked = true;
  }

  recieveProductFromSupplier() {
    this.submitted = true;
    if (this.productFromSupplierForm.valid) {
      this.productSupplier = Object.assign(
        {},
        this.productFromSupplierForm.value
      );

      this.productSupplierService
        .createNewTransferOperation(this.productSupplier)
        .subscribe(
          (res) => {
            this.submitted = false;
            this.alertifyService.success('تم إضافة أمر توريد بنجاح');
            this.productFromSupplierForm.reset();
            this.productSupplierService.orderItems = [];
          },
          (err) => {
            this.alertifyService.error(err);
          }
        );
    }
  }

  deleteOrderItem(index) {
    this.productSupplierService.orderItems.splice(index, 1);
  }
  getOrderItem(index) {
    console.log(this.productSupplierService.orderItems[index]);
  }

  get controls() {
    return this.productFromSupplierForm.controls;
  }
}
