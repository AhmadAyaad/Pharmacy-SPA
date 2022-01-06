import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { MedicineService } from 'src/app/_services/medicine.service.service';

@Component({
  selector: 'app-medicine-file-upload',
  templateUrl: './medicine-file-upload.component.html',
  styleUrls: ['./medicine-file-upload.component.css'],
})
export class MedicineFileUploadComponent implements OnInit {
  fileToUpload: File = null;
  medicinesFromServer:any;

  constructor(
    // private medicineService: MedicineService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleFileInput(files: FileList) {
    console.log(files);
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    const formData = new FormData();
    formData.append('form', this.fileToUpload);

    // if (this.fileToUpload) {
    //   this.medicineService.uploadFile(formData).subscribe(
    //     (res) => {
    //       console.log(res);
    //       this.medicinesFromServer = res;
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }
  }

  saveUploadedMedicinesToDb() {
    // this.medicineService.addUploadedMedicinestoDb(this.medicinesFromServer).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.router.navigate(['/medicines']);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
}
