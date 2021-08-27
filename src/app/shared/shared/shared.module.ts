import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MegaMenuModule,
    ButtonModule,
    MenubarModule,
    TableModule,
    PanelModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
  ],
  providers: [ConfirmationService,MessageService],
})
export class SharedModule {}
