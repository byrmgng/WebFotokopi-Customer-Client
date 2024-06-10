import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/models/order.service';
import { GetOrderDetails } from '../../contracts/order/GetOrderDetails';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  orders: GetOrderDetails[] = [];

  constructor(private orderService:OrderService){};
  async ngOnInit() {
    await this.orderService.getAllOrderDetails().subscribe({
      next: (orderDatas: object | GetOrderDetails[] | any) => {
        this.orders = orderDatas.orderDetails;
      }
    });
    
  }
}
