import { ToastStateEnum } from 'src/app/_models/ToastStateEnum';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Router } from '@angular/router';
import { ToastService } from './../../../_services/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css'],
})
export class AddSupplierComponent implements OnInit {
  supplierFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.createAddNewProductForm();
  }

  private createAddNewProductForm(): void {
    this.supplierFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(75)]],
      phone: [''],
    });
  }
  onSubmit() {
    if (this.supplierFormGroup.valid) {
      this.supplierService
        .createSupplier(this.supplierFormGroup.value)
        .subscribe(
          (res) => {
            this.toastService.showToastMessage(
              'إضافة مورد',
              'تم إضافة مورد بنجاح',
              ToastStateEnum.Success
            );
            this.router.navigate(['/suppliers/list']);
          },
          (err) => {
            this.toastService.showToastMessage(
              'إضافة مورد',
              err.error,
              ToastStateEnum.Error
            );
          }
        );
    }
  }
  get formControls() {
    return this.supplierFormGroup.controls;
  }
}