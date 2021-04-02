import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { PharmacyService } from 'src/app/_services/pharmacy.service';
import { ProductItemsModalComponent } from '../../recieve-product-from-supplier/product-items-modal/product-items-modal.component';
import { PharmacyTransferItemsModalComponent } from '../pharmacy-transfer-items-modal/pharmacy-transfer-items-modal.component';

@Component({
  selector: 'app-pharmacy-product-transfer',
  templateUrl: './pharmacy-product-transfer.component.html',
  styleUrls: ['./pharmacy-product-transfer.component.css'],
})
export class PharmacyProductTransferComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  constructor(
    public _pharmacyService: PharmacyService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {}
  deleteOrderItem(orderItemIndex) {}
  addItem() {
    let config = new MatDialogConfig();
    config.width = '50%';
    this.matDialog.open(PharmacyTransferItemsModalComponent, config);
  }
}
