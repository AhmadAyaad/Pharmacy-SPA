import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateMedicineComponentComponent } from './components/medicine/create-medicine-component/create-medicine-component.component';
import {MedicineService} from "./_services/medicine.service.service"
@NgModule({
  declarations: [
    AppComponent,
    CreateMedicineComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MedicineService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
