import { IProduct } from './../../../_models/IProduct';
import { IKeyValuePair } from './../../../_models/IKeyValuePair';
import { ToastService } from './../../../_services/toast.service';
import { IUnitModel } from './../../../_models/IUnitModel';
import { UnitService } from './../../../_services/unit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ProductService } from './../../../_services/product.service';
import { ToastStateEnum } from 'src/app/_models/ToastStateEnum';
import { ProductTypeModel } from 'src/app/_models/ProductTypeModel';
import { ProductTypeEnum } from 'src/app/_models/ProductTypeEnum';
import { MAX_LENGTH } from '../add-product/add-product.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  selectedProductId: Number;
  selectedProduct: IProduct;
  previousProduct: IProduct;
  units: IKeyValuePair[];
  productEditFormGroup: FormGroup;
  isDataChanged: boolean = false;
  productTypes: Array<ProductTypeModel> = new Array<ProductTypeModel>();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private unitService: UnitService,
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
    this.route.queryParams.subscribe((res) => {
      this.selectedProductId = res.productId;
      this.setSelectedProduct(this.selectedProductId);
    });
  }

  setSelectedProduct(productId: Number): void {
    this.productService.getProduct(productId).subscribe((res: IProduct) => {
      this.selectedProduct = res;
      this.previousProduct = { ...res };
      this.createEditProductFormAndBind(this.selectedProduct);
      this.setProductUnits();
      this.productEditFormGroup.controls.productType.setValue(
        this.productTypes.find(
          (pt) => pt.value === this.selectedProduct.productType
        )
      );

      this.productEditFormGroup.valueChanges.subscribe((changedProductData) => {
        let changedProduct = {
          localCode: changedProductData.localCode,
          name: changedProductData.name,
          nationalCode: changedProductData.nationalCode,
          productType: changedProductData.productType.value,
          unitId: changedProductData.unitId.value,
          id: this.selectedProduct.id,
          createdAt: this.selectedProduct.createdAt,
          unitName: this.selectedProduct.unitName,
        };
        this.isDataChanged = !_.isEqual(this.previousProduct, changedProduct);
      });
    });
  }

  createEditProductFormAndBind(selectedProduct: IProduct): void {
    this.productEditFormGroup = this.formBuilder.group({
      localCode: [
        selectedProduct.localCode,
        [Validators.required, Validators.maxLength(10)],
      ],
      nationalCode: [
        selectedProduct.nationalCode,
        [Validators.required, Validators.maxLength(10)],
      ],
      name: [
        selectedProduct.name,
        [Validators.required, Validators.maxLength(50)],
      ],
      productType: [selectedProduct.productType, Validators.required],
      unitId: [selectedProduct.unitId, Validators.required],
    });
  }

  private setProductUnits() {
    this.unitService.getUnits().subscribe(
      (res: IUnitModel[]) => {
        this.units = res.map((unit) => ({
          label: unit.unitName,
          value: unit.id,
        }));
        this.productEditFormGroup.controls.unitId.setValue(
          this.units.find((u) => u.value === this.selectedProduct.unitId)
        );
      },
      (err) =>
        this.toastService.showToastMessage(
          'إستعادة وحدات المنتج',
          'فشل فى إستعادة وحدات المنتج',
          ToastStateEnum.Error
        )
    );
  }
  onSubmit() {
    if (this.productEditFormGroup.valid) {
      let updatedProduct: IProduct = {
        name: this.productEditFormGroup.value.name,
        localCode: this.productEditFormGroup.value.localCode,
        nationalCode: this.productEditFormGroup.value.nationalCode,
        productType: this.productEditFormGroup.value.productType.value,
        unitId: this.productEditFormGroup.value.unitId.value,
        id: this.selectedProductId,
      };
      this.productService.updateProduct(updatedProduct).subscribe(
        (res) => {
          this.toastService.showToastMessage(
            'تعديل منتج',
            'تم تعديل المنتج بنجاح',
            ToastStateEnum.Success
          );
          this.router.navigate(['/products/list']);
        },
        (err) =>
          this.toastService.showToastMessage(
            'تعديل منتج',
            err.error,
            ToastStateEnum.Error
          )
      );
    }
  }
  get formControls() {
    return this.productEditFormGroup.controls;
  }
  get maxLength(): Number {
    return MAX_LENGTH;
  }
}
