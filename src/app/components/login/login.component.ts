import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginCustomer } from '../../contracts/customer/loginCustomer';
import { CustomerService } from '../../services/models/customer.service';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../../services/custom-toastr.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit{

  constructor(spinner:NgxSpinnerService,private customerService:CustomerService,private toastrService:CustomToastrService,private router:Router,private activatedRoot:ActivatedRoute,private authService:AuthService) {
    super(spinner);
  }
  @ViewChild('txtMailorPhoneNumber') txtMailorPhoneNumber: ElementRef | any;
  @ViewChild('txtPassword') txtPassword: ElementRef |any;
  @ViewChild('smallMessage') smallMessage: ElementRef | any;
  ngOnInit(): void {
  }
  async onSubmit(){
    this.showSpinner();
    const result : LoginCustomer = await this.customerService.loginCustomer(this.txtMailorPhoneNumber.nativeElement.value,this.txtPassword.nativeElement.value);
    this.authService.identityCheck();
    if(!result.succeeded)
      this.smallMessage.nativeElement.textContent = result.message;
    else{
      this.activatedRoot.queryParams.subscribe(params=>{
        const returnUrl : string = params["returnUrl"];
        if(returnUrl){
          
          this.router.navigate([returnUrl]);
        }
        else{
          this.router.navigateByUrl('')
        }
      })
    }
    
    this.hideSpinner();
  }

}
