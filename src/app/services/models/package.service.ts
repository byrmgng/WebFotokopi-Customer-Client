import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { FilterPackage } from '../../entities/filterPackage';
import { Observable, map } from 'rxjs';
import { GetPackage } from '../../contracts/package/getPackage';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private httpClientService: HttpClientService) { }
  FilterPackage(data: FilterPackage): Observable<GetPackage[]> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.put<GetPackage[]|any>({
      controller: "Package",
      action: "GetFilterPackageCustomer",
      headers: headers
    }, data).pipe(
      map(response => {
        return response; // If no transformation is needed, simply return the response
      })
    );
  }
}
