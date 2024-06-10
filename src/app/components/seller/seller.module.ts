import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SellerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"seller", component:SellerComponent}
    ]),
    FormsModule,

  ]
})
export class SellerModule { }
