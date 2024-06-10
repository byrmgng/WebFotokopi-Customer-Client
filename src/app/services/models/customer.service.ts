import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Customer } from '../../entities/customer';
import { CreateCustomer } from '../../contracts/customer/createCustomer';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginCustomer } from '../../contracts/customer/loginCustomer';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClientService: HttpClientService, private toastr:CustomToastrService) { }
  async createCustomer(customer : Customer):Promise<CreateCustomer> {
    const observeble: Observable<CreateCustomer | Customer> = this.httpClientService.post<LoginCustomer | Customer>({
      controller:"Customer",
      action:"CreateCustomer"
    },customer);
    return await firstValueFrom(observeble) as CreateCustomer;
  }
  async loginCustomer(mailorPhoneNumber:string,password:string):Promise<LoginCustomer>{
    const observeble:Observable<any | LoginCustomer> = this.httpClientService.post<any | LoginCustomer>({
      controller:"Customer",
      action:"LoginCustomer",
    },{mailorPhoneNumber,password})
    const result =await firstValueFrom(observeble) as LoginCustomer;
    if(result.succeeded){
      localStorage.setItem("accessToken",result.token.accessToken);
      localStorage.setItem("refreshToken",result.token.refreshToken);
      this.toastr.ShowMessage(result.message,"Giriş Başarılı",ToastrMessageType.Success,ToastrPositon.TopRight);
    }
    return result;
  }
  
  async refreshTokenLoginCustomer(refreshToken:string):Promise<boolean>{
    const observeble:Observable<any | LoginCustomer> = this.httpClientService.post<any | LoginCustomer>({
      controller:"Customer",
      action:"RefreshTokenLoginCustomer",
    },{refreshToken})
    const result =await firstValueFrom(observeble) as LoginCustomer;
    if(result.succeeded){
      localStorage.setItem("accessToken",result.token.accessToken);
      localStorage.setItem("refreshToken",result.token.refreshToken);
    }
    return result.succeeded;
  }
}