import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { GetActiveOrder } from '../../contracts/order/getActiveOrder';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { BaseResponse } from '../../contracts/BaseResponse';
import { GetOrderDetails } from '../../contracts/order/GetOrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) { }
  getActiveOrder(): Observable<GetActiveOrder>{
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.get<GetActiveOrder|any>({
      controller: "Order",
      action: "GetActiveOrder",
      headers: headers
    }).pipe(
      map(response => {
        return response;
      })
    );
  }
  async placeOrder():Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<BaseResponse | any> = this.httpClientService.get<BaseResponse | any>({
      controller:"Order",
      action:"PlaceOrder",
      headers:headers
    });
    return await firstValueFrom(observeble) as BaseResponse;
  }
  getAllOrderDetails(): Observable<GetOrderDetails[]> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.get<GetOrderDetails[]>({
      controller: "Order",
      action:"GetOrderDetails",
      headers:headers
    }).pipe(
      catchError(errorResponse => {
        throw errorResponse.message;
      })
    );
  }
}
