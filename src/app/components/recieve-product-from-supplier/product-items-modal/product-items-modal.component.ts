import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPlusSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MedicineService } from 'src/app/_services/medicine.service.service';
import { PharmacyService } from 'src/app/_services/pharmacy.service';
import { ProductSupplierService } from 'src/app/_services/product-supplier.service';

@Component({
  selector: 'app-product-items-modal',
  templateUrl: './product-items-modal.component.html',
  styleUrls: ['./product-items-modal.component.css'],
})
export class ProductItemsModalComponent implements OnInit {
  productItemForm: FormGroup;
  medicines: [];
  faPlusSquare = faPlusSquare;
  faWindowClose = faWindowClose;
  largePharmacies: [];
  submitted = false;
  selectedMedicineName;
  selectedPharmacyName;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ProductItemsModalComponent>,
    private medicineService: MedicineService,
    private pharmacyService: PharmacyService,
    private productSupplierSerivce: ProductSupplierService
  ) {
    this.createProductItemForm();
    const isNotEmpty = Object.values(data).some((x) => x !== null && x !== '');
    // if (isEmpty) {
    //   console.log(this.productItemForm.controls['price'].setValue(60));

    //   console.log(
    //     this.productItemForm.controls['medicineId'].setValue({
    //       medicineId: 1,
    //       medicineName: 'bla',
    //     })
    //   );
    //   console.log(this.productItemForm.get('medicineId').patchValue(1));
    //   console.log(this.productItemForm.value);
    // }
  }

  ngOnInit(): void {
    this.getMedicines();
    this.getPharmacies();
  }

  getMedicines() {
    this.medicineService.getMedicinesWithUnitNames().subscribe(
      (res: any) => {
        let response = res;
        this.medicines = response.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPharmacies() {
    this.pharmacyService.getLargePharmacies().subscribe((res: any) => {
      this.largePharmacies = res;
    });
  }
  handleMedicineSelection(medicineName) {
    // let selectedOptions = medicineName.target['options'];
    // let selectedIndex = selectedOptions.selectedIndex;
    // let selectElementText = selectedOptions[selectedIndex].text;
    // selectedOptions[selectedIndex].text = 'ayaaaaaaaaaaaaad';
    // console.log(selectElementText);

    this.selectedMedicineName = medicineName;
    // console.log(typeof this.selectedMedici-neName);
  }
  handlePharmacySelection(pharmacyName) {
    this.selectedPharmacyName = pharmacyName;
  }

  submitform() {
    this.submitted = true;
    if (this.productItemForm.valid) {
      let formsData = {
        ...JSON.parse(
          JSON.stringify({ medicineName: this.selectedMedicineName })
        ),
        ...JSON.parse(
          JSON.stringify({ pharmacyName: this.selectedPharmacyName })
        ),
        ...this.productItemForm.value,
      };
      this.productSupplierSerivce.orderItems.push(formsData);
      this.dialogRef.close();
    }
  }
  createProductItemForm() {
    this.productItemForm = new FormGroup({
      medicineId: new FormControl('', Validators.required),
      pharmacyId: new FormControl('', Validators.required),
      itemQuantity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      expireDate: new FormControl('', Validators.required),
    });
  }
}
