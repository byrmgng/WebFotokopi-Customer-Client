import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { SellerModule } from './seller/seller.module';
import { RegistrationModule } from './registration/registration.module';
import { ShoppingModule } from './shopping/shopping.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    LoginModule,
    SellerModule,
    RegistrationModule,
    ShoppingModule
  ]
})
export class ComponentsModule { }
