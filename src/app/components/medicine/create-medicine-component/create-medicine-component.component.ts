import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IMedicineDTO } from 'src/app/Dtos/IMedicineDTO';
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
    private formBuilder: FormBuilder,
    private unitService: UnitService,
    private medicineService: MedicineService
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
      medicineName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
      sellingPrice: new FormControl('', Validators.required),
      expireDate: new FormControl('', Validators.required),
      unitId: new FormControl('', Validators.required),
    });
  }

  createMedicine() {
    this.submitted = true;
    if (this.medicineForm.valid) {
      this.medicine = Object.assign({}, this.medicineForm.value);

      this.medicineService.createMedicine(this.medicine).subscribe(
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
