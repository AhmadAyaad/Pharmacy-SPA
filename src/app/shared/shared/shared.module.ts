import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
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
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { HttpClientModule } from '@angular/common/http';

import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
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
    DynamicDialogModule,
    CalendarModule,
    SidebarModule,
    ScrollPanelModule,
    AccordionModule,
    MenuModule,
    AvatarModule,
    HttpClientModule,
  ],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class SharedModule {}
