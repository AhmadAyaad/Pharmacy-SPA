import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/_services/toast.service';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ISupplier } from 'src/app/_models/ISupplier.model';
import * as _ from 'lodash';
import { ToastStateEnum } from 'src/app/_models/ToastStateEnum';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css'],
})
export class SupplierEditComponent implements OnInit {
  supplierFormGroup: FormGroup;
  isDataChanged: boolean = false;
  selectedSupplier: ISupplier;
  previousSupplier: ISupplier;
  selectedSupplierId: Number;
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private route: ActivatedRoute,

    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.selectedSupplierId = res.supplierId;
      this.setSelectedSupplier(this.selectedSupplierId);
    });
  }
  setSelectedSupplier(supplierId: Number) {
    this.supplierService.getSupplier(supplierId).subscribe(
      (res: ISupplier) => {
        this.selectedSupplier = res;
        this.previousSupplier = { ...res };
        this.createAndBindEditProductForm(this.selectedSupplier);

        this.supplierFormGroup.valueChanges.subscribe((changedSupplierData) => {
          let changedSupplier = {
            name: changedSupplierData.name,
            address: changedSupplierData.address,
            phone: changedSupplierData?.phone,
            id: this.selectedSupplier.id,
          };
          this.isDataChanged = !_.isEqual(
            this.previousSupplier,
            changedSupplier
          );
        });
      },
      (err) => {
        this.toastService.showToastMessage(
          'إستعادة بيانات المورد',
          err.error,
          ToastStateEnum.Error
        );
      }
    );
  }
  private createAndBindEditProductForm(supplier: ISupplier): void {
    this.supplierFormGroup = this.formBuilder.group({
      name: [supplier.name, [Validators.required, Validators.maxLength(50)]],
      address: [
        supplier.address,
        [Validators.required, Validators.maxLength(75)],
      ],
      phone: [supplier?.phone],
    });
  }
  onSubmit() {
    if (this.supplierFormGroup.valid) {
      this.supplierService
        .createSupplier(this.supplierFormGroup.value)
        .subscribe(
          (res) => {
            this.toastService.showToastMessage(
              'تعديل بيانات مورد',
              'تم تعديل بيانات المورد بنجاج',
              ToastStateEnum.Success
            );
          },
          (err) => {
            this.toastService.showToastMessage(
              'تعديل بيانات مورد',
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
