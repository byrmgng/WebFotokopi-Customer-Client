import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { BaseResponse } from '../../contracts/BaseResponse';
import { CreateProduct } from '../../contracts/product/createProduct';
import { HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }
  async createProduct(data : CreateProduct):Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<CreateProduct | BaseResponse> = this.httpClientService.post<CreateProduct | BaseResponse>({
      controller:"Product",
      action:"CreateProduct",
      headers:headers
    },data);
    return await firstValueFrom(observeble) as BaseResponse;
  }
  async createProductforCustomer(data:FormData):Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<FormData | BaseResponse> = this.httpClientService.post<FormData | BaseResponse>({
      controller:"Product",
      action:"CreateProductForCustomer",
      headers:headers
    },data);
    return await firstValueFrom(observeble) as BaseResponse;
  }
  async deleteProduct(data : string):Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<BaseResponse | string> = this.httpClientService.delete<BaseResponse | string>({
      controller:"Product",
      action:"DeleteProduct",
      headers:headers
    },data);
    return await firstValueFrom(observeble) as BaseResponse;
  }
}
