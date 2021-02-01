import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMedicineDTO } from 'src/app/Dtos/IMedicineDTO';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MedicineService } from 'src/app/_services/medicine.service.service';
import { UnitService } from 'src/app/_services/unit.service';

@Component({
  selector: 'app-create-medicine-component',
  templateUrl: './create-medicine-component.component.html',
  styleUrls: ['./create-medicine-component.component.css'],
})
export class CreateMedicineComponentComponent implements OnInit {
  medicine: IMedicineDTO;
  medicineForm: FormGroup;
  submitted = false;
  units: any[];
  constructor(
    private unitService: UnitService,
    private medicineService: MedicineService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.createMedicineForm();
    this.unitService.getUnits().subscribe((res: any) => {
      console.log(res);
      this.units = res;
      console.log(this.units);
    });
  }
  get formControls() {
    return this.medicineForm.controls;
  }
  createMedicineForm() {
    this.medicineForm = new FormGroup({
      medicineCode: new FormControl('', Validators.required),
      nationalCode: new FormControl('', Validators.required),
      productType: new FormControl('Medicine'),
      medicineName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
      sellingPrice: new FormControl('', Validators.required),
      unitId: new FormControl('', Validators.required),
    });
  }

  createMedicine() {
    this.submitted = true;
    console.log(this.alertifyService);
    this.alertifyService.success('elhamdollah');
    if (this.medicineForm.valid) {
      this.medicine = Object.assign({}, this.medicineForm.value);
      console.log(this.medicine);
      this.medicineService.createMedicine(this.medicine).subscribe(
        (res) => {
          this.alertifyService.success('تم إضافة منتج جديد بنجاح');
          this.router.navigate(['/medicines']);
          console.log(res);
        },
        (err) => {
          console.log(err);
          this.alertifyService.error(err);
        }
      );
    }
  }
}
