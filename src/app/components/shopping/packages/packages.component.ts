import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService } from '../../../services/custom-toastr.service';
import { SellerService } from '../../../services/models/seller.service';
import { PackageFeature } from '../../../contracts/package/packageFeatures';
import { GetPackage } from '../../../contracts/package/getPackage';
import { FilterPackage } from '../../../entities/filterPackage';
import { PackageService } from '../../../services/models/package.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent extends BaseComponent implements OnInit, AfterViewInit {
  packageFeature!: PackageFeature;
  packages: GetPackage[] = [];
  sellerId!: string;

  //Filter Elements
  @ViewChild('filterName') filterName: any;
  @ViewChild('filterPaperSize') filterPaperSize: any;
  @ViewChild('filterPaperType') filterPaperType: any;
  @ViewChild('filterSheetsPerPage') filterSheetsPerPage: any;
  @ViewChild('filterColorMode') filterColorMode: any;
  @ViewChild('filterDuplexMode') filterDuplexMode: any;  

  constructor(
    spinner: NgxSpinnerService,
    private toastr: CustomToastrService,
    private packageService:PackageService,
    private sellerService:SellerService,
    private route: ActivatedRoute,
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
    const packageNameS:string =  this.filterName.nativeElement.value;
    const paperSizeIDS:string = this.filterPaperSize.nativeElement.options[this.filterPaperSize.nativeElement.selectedIndex].value;
    const paperTypeIDS:string =  this.filterPaperType.nativeElement.options[this.filterPaperType.nativeElement.selectedIndex].value;
    const sheetsPerPageIDS:string = this.filterSheetsPerPage.nativeElement.options[this.filterSheetsPerPage.nativeElement.selectedIndex].value;
    const colorModeS: string = this.filterColorMode.nativeElement.options[this.filterColorMode.nativeElement.selectedIndex].value;
    const duplexModeS: string =  this.filterDuplexMode.nativeElement.options[this.filterDuplexMode.nativeElement.selectedIndex].value;
    this.route.queryParams.subscribe(params => {
      this.sellerId = params['sellerID'];
    });
    const filterPackage:FilterPackage={
      sellerID:this.sellerId,
      packageName: packageNameS,
      paperSizeID:paperSizeIDS,
      paperTypeID:paperTypeIDS,
      sheetsPerPageID:sheetsPerPageIDS,
      duplexMode: duplexModeS,
      colorMode : colorModeS,
    };
    this.showSpinner();
    await this.packageService.FilterPackage(filterPackage).subscribe({
      next: (packageDatas: object | GetPackage | any) => {
        this.packages = packageDatas.packages;
      }
    });
    this.hideSpinner();
  }
  clearFilter(){
    this.filterName.nativeElement.value="";
    this.filterPaperSize.nativeElement.selectedIndex =0;
    this.filterPaperType.nativeElement.selectedIndex =0;
    this.filterSheetsPerPage.nativeElement.selectedIndex =0;
    this.filterDuplexMode.nativeElement.selectedIndex =0;
    this.filterColorMode.nativeElement.selectedIndex =0;
  }
}
