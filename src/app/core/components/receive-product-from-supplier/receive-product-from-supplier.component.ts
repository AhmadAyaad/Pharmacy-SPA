import { ToastStateEnum } from './../../../_models/ToastStateEnum';
import { SupplierOrderModalComponent } from './../supplier-order-modal/supplier-order-modal.component';
import { ISupplier } from './../../../_models/ISupplier.model';
import { IPharmacy } from './../../../_models/IPharmacy';
import { IProduct } from './../../../_models/IProduct';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'primeng/dynamicdialog';
import { ISupplyOrderDetails } from '../../_models/ISupplyOrderDetails.model';
import * as moment from 'moment';
import { SupplyOrderService } from '../../_services/supply-order.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-receive-product-from-supplier',
  templateUrl: './receive-product-from-supplier.component.html',
  styleUrls: ['./receive-product-from-supplier.component.css'],
})
export class ReceiveProductFromSupplierComponent implements OnInit {
  supplierOrderForm: FormGroup;
  faPlusSquare = faPlusSquare;

  suppliers: ISupplier[];
  products: IProduct[];
  largePharmacies: IPharmacy[];
  data: Array<any> = new Array<any>();
  constructor(
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    private supplyOrderService: SupplyOrderService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.createSupplierOrderForm();
  }
  private createSupplierOrderForm() {
    this.supplierOrderForm = this.formBuilder.group({
      importOrderNumber: new FormControl('', Validators.required),
    });
  }

  addNewProduct() {
    const ref = this.dialogService.open(SupplierOrderModalComponent, {
      width: '35%',
      header: 'توريد منتج',
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        result.expireDate = moment(result.expireDate).format('L');
        this.data.push(result);
      }
    });
  }
  get formControls() {
    return this.supplierOrderForm.controls;
  }
  onSubmit() {
    if (this.supplierOrderForm.valid) {
      this.supplyOrderService
        .recieveProductFromSupplier({
          importOrderNumber: this.supplierOrderForm.value.importOrderNumber,
          supplyOrdersDetailsDTO: this.data.map(
            (d) =>
              <ISupplyOrderDetails>{
                price: d.price,
                quantity: d.quantity,
                supplyOrderNumber: d.supplyOrderNumber,
                approvalNumber: d.approvalNumber,
                supplierId: d.supplierId.id,
                batchNumber: d.batchNumber,
                expireDate: d.expireDate,
                productId: d.productId.id,
                purchaseFee: d.purchaseFee,
                pharmacyId: d.pharmacyId.id,
              }
          ),
        })
        .subscribe(
          (res) => {
            this.toastService.showToastMessage(
              'توريد منتج',
              'أمر توريد ناجح',
              ToastStateEnum.Success
            );
            this.data = [];
            this.supplierOrderForm.reset();
          },
          (err) => {
            this.toastService.showToastMessage(
              'توريد منتج',
              'حدث خطأ فى أمر التوريد',
              ToastStateEnum.Error
            );
          }
        );
    }
  }
}
