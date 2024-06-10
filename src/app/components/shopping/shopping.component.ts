import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from '../../services/models/seller.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService } from '../../services/custom-toastr.service';
import { GetSmallSeller } from '../../contracts/seller/getSmallSeller';
import { BaseComponent } from '../base/base.component';
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export class ShoppingComponent extends BaseComponent implements OnInit,AfterViewInit {
  seller!: GetSmallSeller;
  sellerId!: string;

  constructor(private route: ActivatedRoute,
    private sellerService:SellerService,
    spinner: NgxSpinnerService,
  ) {
    super(spinner);
   }
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sellerId = params['sellerID'];
    });
    this.sellerService.getSeller(this.sellerId).subscribe({
      next: (sellerDatas: object | GetSmallSeller | any) => {
        this.seller = sellerDatas.seller;
        debugger;
      }
    });
  }
  ngAfterViewInit(): void {
    
  }
}
