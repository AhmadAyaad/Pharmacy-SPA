import { Router } from '@angular/router';
import { IProductDTO } from './../../../Dtos/IProductDTO';
import { ProductService } from './../../../_services/product.service';
import { ToastService } from './../../../_services/toast.service';
import { IUnitModel } from './../../../_models/IUnitModel';
import { UnitService } from 'src/app/_services/unit.service';
import { ProductTypeModel } from './../../../_models/ProductTypeModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductTypeEnum } from 'src/app/_models/ProductTypeEnum';
import { ToastStateEnum } from 'src/app/_models/ToastStateEnum';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productFormGroup: FormGroup;
  productTypes: Array<ProductTypeModel> = new Array<ProductTypeModel>();
  units: IUnitModel[];
  constructor(
    private formBuilder: FormBuilder,
    private unitSerivce: UnitService,
    private productService: ProductService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.productTypes = [
      {
        name: ProductTypeEnum[ProductTypeEnum.Medicine],
        value: ProductTypeEnum.Medicine,
      },
      {
        name: ProductTypeEnum[ProductTypeEnum.Equipment],
        value: ProductTypeEnum.Equipment,
      },
    ];
  }

  ngOnInit(): void {
    this.setProductUnits();
    this.createAddNewProductForm();
  }

  onSubmit() {
    if (this.productFormGroup.valid) {
      let productDTO: IProductDTO = {
        localCode: this.productFormGroup.value.localCode,
        name: this.productFormGroup.value.name,
        nationalCode: this.productFormGroup.value.nationalCode,
        unitId: this.productFormGroup.value.unitId.id,
        productType: this.productFormGroup.value.productType.value,
      };
      this.productService.addNewProduct(productDTO).subscribe(
        (res) => {
          this.toastService.showToastMessage(
            'إضافة منتج جديد',
            'تم إضافة المنتج بنجاح',
            ToastStateEnum.Success
          );
          this.router.navigate(['/products/list']);
        },
        (err) =>
          this.toastService.showToastMessage(
            'إضافة منتج جديد',
            err.error,
            ToastStateEnum.Error
          )
      );
    }
  }
  private createAddNewProductForm(): void {
    this.productFormGroup = this.formBuilder.group({
      localCode: ['', [Validators.required, Validators.maxLength(10)]],
      nationalCode: ['', [Validators.required, Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      productType: ['', Validators.required],
      unitId: ['', Validators.required],
    });
  }
  private setProductUnits() {
    this.unitSerivce.getUnits().subscribe(
      (res: IUnitModel[]) => {
        this.units = res;
      },
      (err) =>
        this.toastService.showToastMessage(
          'إستعادة وحدات المنتج',
          'فشل فى إستعادة وحدات المنتج',
          ToastStateEnum.Error
        )
    );
  }
  get formControls() {
    return this.productFormGroup.controls;
  }
  get maxLength(): Number {
    return MAX_LENGTH;
  }
}

export const MAX_LENGTH: Number = 10;
