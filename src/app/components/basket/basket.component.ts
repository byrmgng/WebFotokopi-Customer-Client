import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../../services/models/order.service';
import { GetActiveOrder } from '../../contracts/order/getActiveOrder';
import { GetOrderItem } from '../../contracts/order/getOrderItem';
import { ProductService } from '../../services/models/product.service';
import { BaseResponse } from '../../contracts/BaseResponse';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../../services/custom-toastr.service';
import { debug } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent extends BaseComponent implements OnInit,AfterViewInit {

  constructor(private router:Router,spinner:NgxSpinnerService,private orderService:OrderService,private productService:ProductService,private toastr:CustomToastrService) {
    super(spinner);
  }
  sellerName!:string;
  price!:number;
  activeOrderItems:GetOrderItem[]=[];

  async ngOnInit(){
  }
  async ngAfterViewInit(){
    this.getOrder();
  }
  async deleteProduct(id:string){
    this.showSpinner();
    const result: BaseResponse = await this.productService.deleteProduct(id);
    this.hideSpinner();
    if (result.succeeded) {
      this.toastr.ShowMessage(result.message,"İşlem Başarılı",ToastrMessageType.Success,ToastrPositon.BottomCenter);
      this.getOrder();
    }
    else
      this.toastr.ShowMessage(result.message,"İşlem Başarısız",ToastrMessageType.Error,ToastrPositon.BottomCenter);
  }
  async getOrder(){
    this.showSpinner();
    await this.orderService.getActiveOrder().subscribe({
      next: (orderData: GetActiveOrder) => {
        this.sellerName = orderData.sellerName;
        this.price = orderData.price;
        this.activeOrderItems = orderData.items;
      }
    });
    this.hideSpinner();
  }
  async placeOrder(){
    this.showSpinner();
    const result: BaseResponse = await this.orderService.placeOrder();
    this.hideSpinner();
    if(result.succeeded)
      this.toastr.ShowMessage(result.message,"İşlem Başarılı",ToastrMessageType.Success,ToastrPositon.BottomCenter);
    else
      this.toastr.ShowMessage(result.message,"İşlem Başarısız",ToastrMessageType.Error,ToastrPositon.BottomCenter);
    this.router.navigate(["seller"]);
  }
}
