import { ISupplier } from 'src/app/_models/ISupplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { PharmacyService } from '../../_services/pharmacy.service';
import { IProduct } from 'src/app/_models/IProduct';
import { ProductService } from './../../../_services/product.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { IPharmacy } from 'src/app/_models/IPharmacy';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-supplier-order-modal',
  templateUrl: './supplier-order-modal.component.html',
  styleUrls: ['./supplier-order-modal.component.css'],
})
export class SupplierOrderModalComponent implements OnInit {
  supplierOrderDetailsForm: FormGroup;
  products: IProduct[];
  largePharmacies: IPharmacy[];
  suppliers: ISupplier[];
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private supplierService: SupplierService,
    private pharmacyService: PharmacyService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.productService.getProductsWithUnitName(),
      this.pharmacyService.getLargePharmacies(),
      this.supplierService.getSuppliers(),
    ]).subscribe(
      (results) => {
        this.products = results[0];
        this.largePharmacies = results[1];
        this.suppliers = results[2];
        this.createNewProductForm();
      },
      (err) => {
        this.ref.close();
      }
    );
  }
  createNewProductForm() {
    this.supplierOrderDetailsForm = this.formBuilder.group({
      productId: new FormControl('', Validators.required),
      pharmacyId: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      expireDate: new FormControl('', Validators.required),
      supplyOrderNumber: new FormControl('', Validators.required),
      approvalNumber: new FormControl('', Validators.required),
      purchaseFee: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      supplierId: new FormControl('', Validators.required),
      batchNumber: new FormControl('', [Validators.required]),
    });
  }
  get formControls() {
    return this.supplierOrderDetailsForm.controls;
  }
  onSubmit() {
    this.ref.close(this.supplierOrderDetailsForm.value);
  }
}
