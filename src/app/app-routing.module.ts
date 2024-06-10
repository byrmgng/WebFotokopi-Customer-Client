import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { logoutauthGuard } from './guards/logoutauth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { SellerComponent } from './components/seller/seller.component';
import { authGuard } from './guards/auth.guard';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { BasketComponent } from './components/basket/basket.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {path:"",component:HomeComponent,loadChildren:() => import("./components/home/home.module").then(module=>module.HomeModule),canActivate:[logoutauthGuard]},
  {path:"seller",component:SellerComponent,loadChildren:() => import("./components/seller/seller.module").then(module=>module.SellerModule),canActivate:[authGuard]},
  {path:"basket",component:BasketComponent,loadChildren:() => import("./components/basket/basket.module").then(module=>module.BasketModule),canActivate:[authGuard]},
  {path:"order",component:OrderComponent,loadChildren:() => import("./components/order/order.module").then(module=>module.OrderModule),canActivate:[authGuard]},
  {path:"shopping",component:ShoppingComponent,loadChildren:() => import("./components/shopping/shopping.module").then(module=>module.ShoppingModule),canActivate:[authGuard]},
  {path:"login",component:LoginComponent,loadChildren:() => import("./components/login/login.module").then(module=>module.LoginModule),canActivate:[logoutauthGuard]},
  {path:"registration",component:RegistrationComponent,loadChildren:() => import("./components/registration/registration.module").then(module=>module.RegistrationModule),canActivate:[logoutauthGuard]},
  { path: "**", redirectTo: "" } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
