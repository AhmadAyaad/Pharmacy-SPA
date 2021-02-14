import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProductSupplierDto } from 'src/app/Dtos/IProductSupplierDto';
import { ISupplierDto } from 'src/app/Dtos/ISupplierDto';
import { IMedicine } from 'src/app/_models/IMedicine';
import { IPharmacy } from 'src/app/_models/IPharmacy';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MedicineService } from 'src/app/_services/medicine.service.service';
import { PharmacyService } from 'src/app/_services/pharmacy.service';
import { ProductSupplierService } from 'src/app/_services/product-supplier.service';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-recieve-product-from-supplier',
  templateUrl: './recieve-product-from-supplier.component.html',
  styleUrls: ['./recieve-product-from-supplier.component.css'],
})
export class RecieveProductFromSupplierComponent implements OnInit {
  productFromSupplierForm: FormGroup;
  productSupplier: IProductSupplierDto;
  suppliers: ISupplierDto[];
  products: IMedicine[];
  largePharmacies: IPharmacy[];
  submitted = false;
  radioButtonClicked = false;
  constructor(
    private supplierService: SupplierService,
    private productService: MedicineService,
    private pharmacyService: PharmacyService,
    private productSupplierService: ProductSupplierService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.createProductSupplierForm();
    this.getSuppliers();
    this.getProducts();
    this.getLargePharmacies();
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(
      (res: ISupplierDto[]) => {
        this.suppliers = res;
      },
      (err) => {
        this.alertifyService.error(err);
      }
    );
  }

  getProducts() {
    this.productService
      .getMedicinesWithUnitNames()
      .subscribe((res: IMedicine[]) => {
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
      productType: new FormControl('', Validators.required),
      supplierId: new FormControl('', Validators.required),
      productId: new FormControl('', Validators.required),
      pharmacyId: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
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
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
