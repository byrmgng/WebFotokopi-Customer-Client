import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { PackageFeature } from '../../contracts/package/packageFeatures';
import { Observable, catchError, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { GetSmallSeller } from '../../contracts/seller/getSmallSeller';
import { FilterSeller } from '../../contracts/seller/filterSeller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private httpClientService: HttpClientService) { }
  getFeatures(): Observable<PackageFeature[]> {
    return this.httpClientService.get<PackageFeature[]>({
      controller: "Package",
      action:"GetPackageFeatures",
    }).pipe(
      catchError(errorResponse => {
        throw errorResponse.message;
      })
    );
  }
  FilterSeller(data: FilterSeller): Observable<GetSmallSeller[]> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.put<GetSmallSeller[]|any>({
      controller: "Seller",
      action: "GetFilterSeller",
      headers: headers
    }, data).pipe(
      map(response => {
        return response;
      })
    );
  }
  getSeller(sellerID:string): Observable<GetSmallSeller>{
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.post<GetSmallSeller|any>({
      controller: "Seller",
      action: "GetSellerFeatures",
      headers: headers
    }, {sellerID}).pipe(
      map(response => {
        return response;
      })
    );
  }
  
}
