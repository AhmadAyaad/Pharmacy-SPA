import { Component, OnInit } from '@angular/core';
import { SupplyOrderService } from '../../_services/supply-order.service';

@Component({
  selector: 'app-supply-order-list',
  templateUrl: './supply-order-list.component.html',
  styleUrls: ['./supply-order-list.component.css'],
})
export class SupplyOrderListComponent implements OnInit {
  supplyOrders;
  constructor(private supplyOrderService: SupplyOrderService) {}

  ngOnInit(): void {
    this.getSupplyOrdersWithDetails();
  }

  getSupplyOrdersWithDetails() {
    this.supplyOrderService.getSupplyOrdersWithDetails().subscribe((res) => {
      this.supplyOrders = res;
      console.log(res);
    });
  }
}
