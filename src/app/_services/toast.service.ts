import { ToastStateEnum } from './../_models/ToastStateEnum';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showToastMessage(
    summary: string,
    detail: string,
    timeTodisaply: number,
    severity: ToastStateEnum
  ) {
    this.messageService.add({
      summary,
      detail,
      life: timeTodisaply,
      severity: this.getSeverity(severity),
    });
  }

  private getSeverity(severity: ToastStateEnum) {
    switch (severity) {
      case ToastStateEnum.Error:
        return 'error';
      case ToastStateEnum.Success:
        return 'success';
      default:
        return 'info';
    }
  }
}
