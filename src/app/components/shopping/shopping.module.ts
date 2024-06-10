import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PackagesModule } from './packages/packages.module';
import { ProductsModule } from './products/products.module';
import { ProductsComponent } from './products/products.component';
import { PackagesComponent } from './packages/packages.component';



@NgModule({
  declarations: [
    ShoppingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component:ProductsComponent,loadChildren:()=>import("./products/products.module").then(module=>module.ProductsModule)},
      {path:"package", component:PackagesComponent,loadChildren:()=>import("./packages/packages.module").then(module=>module.PackagesModule)},

    ]),
    FormsModule,
    PackagesModule,
    ProductsModule,
    FormsModule,
  ]
})
export class ShoppingModule { }
