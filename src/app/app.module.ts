import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import{RouterModule, Routes} from '@angular/router';

import {routes} from './routes'
import { AppComponent } from './app.component';
import { CreateMedicineComponentComponent } from './components/medicine/create-medicine-component/create-medicine-component.component';
import {MedicineService} from "./_services/medicine.service.service"


// const routes : Routes = [
//   {path:'medicine' , component: CreateMedicineComponentComponent},
// ]


@NgModule({
  declarations: [
    AppComponent,
    CreateMedicineComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

  ],
  providers: [MedicineService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
