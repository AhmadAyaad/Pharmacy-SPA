import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ISupplierDto } from 'src/app/Dtos/ISupplierDto';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css'],
})
export class CreateSupplierComponent implements OnInit {
  supplier: ISupplierDto;
  supplierForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private supplierSerivce: SupplierService
  ) {}

  ngOnInit(): void {
    this.createSupplierForm();
  }

  createSupplierForm() {
    this.supplierForm = new FormGroup({
      supplierName: new FormControl('', Validators.required),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
      phone: new FormControl('', Validators.required),
    });
  }

  createSupplier() {
    this.submitted = true;
    if (this.supplierForm.valid) {
      this.supplier = Object.assign({}, this.supplierForm.value);

      this.supplierSerivce.createSupplier(this.supplier).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    console.log('hna erroooooooooooooooooooooor');
  }
}
