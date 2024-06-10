import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService } from '../../services/custom-toastr.service';
import { SellerService } from '../../services/models/seller.service';
import { PackageFeature } from '../../contracts/package/packageFeatures';
import { FilterSeller } from '../../contracts/seller/filterSeller';
import { GetSmallSeller } from '../../contracts/seller/getSmallSeller';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.scss'
})
export class SellerComponent extends BaseComponent implements OnInit, AfterViewInit {

  packageFeature!: PackageFeature;
  sellers: GetSmallSeller[] = [];

  //Filter Elements
  @ViewChild('filterSellerName') filterSellerName: any;
  @ViewChild('filterPaperSize') filterPaperSize: any;
  @ViewChild('filterPaperType') filterPaperType: any;
  @ViewChild('filterSheetsPerPage') filterSheetsPerPage: any;
  @ViewChild('filterColorMode') filterColorMode: any;
  @ViewChild('filterDuplexMode') filterDuplexMode: any;  
  @ViewChild('logo') logo:any;

  constructor(
    spinner: NgxSpinnerService,
    private toastr: CustomToastrService,
    private sellerService:SellerService
  ) {
    super(spinner);
  }
  
  ngOnInit(): void {
    this.showSpinner();
    this.sellerService.getFeatures().subscribe({
      next: (featureData: object | PackageFeature | any) => {
        this.packageFeature = featureData.packageFeature;
      }
    });
    this.hideSpinner();
  }
  ngAfterViewInit(): void {
    this.filter();
  }
  async filter(){
    const sellerNameS:string =  this.filterSellerName.nativeElement.value;
    const paperSizeIDS:string = this.filterPaperSize.nativeElement.options[this.filterPaperSize.nativeElement.selectedIndex].value;
    const paperTypeIDS:string =  this.filterPaperType.nativeElement.options[this.filterPaperType.nativeElement.selectedIndex].value;
    const sheetsPerPageIDS:string = this.filterSheetsPerPage.nativeElement.options[this.filterSheetsPerPage.nativeElement.selectedIndex].value;
    const colorModeS: string = this.filterColorMode.nativeElement.options[this.filterColorMode.nativeElement.selectedIndex].value;
    const duplexModeS: string =  this.filterDuplexMode.nativeElement.options[this.filterDuplexMode.nativeElement.selectedIndex].value;
    const filterSeller:FilterSeller={
      sellerName: sellerNameS,
      paperSizeID:paperSizeIDS,
      paperTypeID:paperTypeIDS,
      sheetsPerPageID:sheetsPerPageIDS,
      duplexMode: duplexModeS,
      colorMode : colorModeS,
    };
    this.showSpinner();
    await this.sellerService.FilterSeller(filterSeller).subscribe({
      next: (sellerDatas: object | GetSmallSeller | any) => {
        this.sellers = sellerDatas.sellers;
      }
    });
    this.hideSpinner();
  }
  async clearFilter(){
    this.filterSellerName.nativeElement.value = "";
    this.filterPaperSize.nativeElement.selectedIndex =0;
    this.filterPaperType.nativeElement.selectedIndex =0;
    this.filterSheetsPerPage.nativeElement.selectedIndex =0;
    this.filterDuplexMode.nativeElement.selectedIndex =0;
    this.filterColorMode.nativeElement.selectedIndex =0;
  }
}
