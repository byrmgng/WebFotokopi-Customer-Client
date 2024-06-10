import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesComponent } from './packages.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PackagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"packages", component:PackagesComponent}
    ]),
  ]
})
export class PackagesModule { }
