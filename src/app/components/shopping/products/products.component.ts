import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../../../services/custom-toastr.service';
import { GetFilterFileResponse } from '../../../contracts/file/getFilterFileResponse';
import { GetByIdFile } from '../../../contracts/file/getByIdFile';
import { FileService } from '../../../services/models/file.service';
import { UpdateFile } from '../../../contracts/file/updateFile';
import { BaseResponse } from '../../../contracts/BaseResponse';
import { GetFilterFileResquest } from '../../../contracts/file/getFilterFileRequest';
import { ActivatedRoute } from '@angular/router';
import { PackageFeature } from '../../../contracts/package/packageFeatures';
import { GetPackage } from '../../../contracts/package/getPackage';
import { FilterPackage } from '../../../entities/filterPackage';
import { PackageService } from '../../../services/models/package.service';
import { SellerService } from '../../../services/models/seller.service';
import { CreateProduct } from '../../../contracts/product/createProduct';
import { ProductService } from '../../../services/models/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})


export class ProductsComponent extends BaseComponent implements OnInit,AfterViewInit{
  constructor(
    spinner: NgxSpinnerService,
    private toastr: CustomToastrService,
    private fileService:FileService,
    private route: ActivatedRoute,
    private packageService:PackageService,
    private sellerService:SellerService,
    private productService:ProductService
  ) {
    super(spinner);
  }

  files: GetFilterFileResponse[] = [];
  getByIdFile:GetByIdFile = new GetByIdFile();
  updateFileID:string|any;
  deleteFileID:string|any;
  fileContentPDF!:string;
  sellerId!: string;
  packageFeature!: PackageFeature;
  packages: GetPackage[] = [];
  createProduct:CreateProduct=new CreateProduct();
  customFile : boolean = false;

  @ViewChild('pdfContent') pdfContent:any;

  @ViewChild('fileTitleFilter') fileTitleFilter:any;
  @ViewChild('fileNoteFilter') fileNoteFilter:any;

  @ViewChild('fileTitleModal') fileTitleModal: any;
  @ViewChild('fileNoteModal') fileNoteModal: any;
  @ViewChild('fileContentModal') fileContentModal: any;

  //@ViewChild('fileTitleModalConfirm') fileTitleModalConfirm: any;
  //@ViewChild('fileNoteModalConfirm') fileNoteModalConfirm: any;
  //@ViewChild('fileNameModalConfirm') fileNameModalConfirm: any;

  @ViewChild('fileTitleViewModal') fileTitleViewModal:any;
  @ViewChild('fileNoteViewModal') fileNoteViewModal:any;

  @ViewChild('deleteFileModalBody') deleteFileModalBody:any;

  @ViewChild('filterName') filterName: any;
  @ViewChild('filterPaperSize') filterPaperSize: any;
  @ViewChild('filterPaperType') filterPaperType: any;
  @ViewChild('filterSheetsPerPage') filterSheetsPerPage: any;
  @ViewChild('filterColorMode') filterColorMode: any;
  @ViewChild('filterDuplexMode') filterDuplexMode: any;  

  @ViewChild('productQuantityModal') productQuantityModal:any;
  @ViewChild('productNoteModal') productNoteModal:any;


  
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sellerId = params['sellerID'];
    });
    this.filter()
  }
  async clearModal(){
    this.fileTitleModal.nativeElement.value="";
    this.fileNoteModal.nativeElement.value="";
    this.fileContentModal.nativeElement.value = "";
  }
  async clearFilter(){
    this.fileTitleFilter.nativeElement.value = "";
    this.fileNoteFilter.nativeElement.value = "";
  }
  async updateFile(){
    const updateFile:UpdateFile={
      fileID:this.updateFileID,
      fileNote:this.fileNoteViewModal.nativeElement.value,
      fileTitle:this.fileTitleViewModal.nativeElement.value,
    };
    this.showSpinner();
    const response : BaseResponse = (await this.fileService.updateFileAsync(updateFile));
    this.hideSpinner();
    if(response.succeeded)
      this.toastr.ShowMessage(response.message,"Güncelleme İşlemi Başarıyla Tamamlandı",ToastrMessageType.Success,ToastrPositon.TopRight);
    else
      this.toastr.ShowMessage(response.message,"Güncelleme İşlemi Tamamlanamadı",ToastrMessageType.Error,ToastrPositon.TopRight);
    await this.filter();
  }
  async viewModalFill(id: string){
    this.showSpinner();
    this.getByIdFile = (await this.fileService.GetByIdFileAsync(id));
    this.hideSpinner();
    const b64Data = this.getByIdFile.fileContent;
    const contentType = 'application/pdf';
    const blob = this.b64toBlob(b64Data, contentType);
    const blobUrl = URL.createObjectURL(blob);
    this.showSpinner();
    this.pdfContent.nativeElement.innerHTML = await `<embed src="${blobUrl}" type="${contentType}" width="100%" height="750px">`;
    this.hideSpinner();
    this.fileNoteViewModal.nativeElement.textContent = this.getByIdFile.fileNote;
    this.fileTitleViewModal.nativeElement.textContent = this.getByIdFile.fileTitle;
  }
  b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
  nextClickSelectPackage(): void {
    
    this.showSpinner();
    this.sellerService.getFeatures().subscribe({
      next: (featureData: object | PackageFeature | any) => {
        this.packageFeature = featureData.packageFeature;
      }
    });
    this.hideSpinner();
    this.filterPackage();

  }
  async createFile(){
    debugger;
    const formData = new FormData();
    const fileInput = this.fileContentModal.nativeElement;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('FileContent', file, file.name);
      formData.append('FileTitle',this.fileTitleModal.nativeElement.value)
      formData.append('FileNote',this.fileNoteModal.nativeElement.value)
    }
    this.showSpinner();
    const result:BaseResponse = await this.fileService.createFile(formData);
    if(result.succeeded)
      this.toastr.ShowMessage(result.message,"Dosya Ekleme İşlemi Başarılı",ToastrMessageType.Success,ToastrPositon.BottomFullWidth)
    else
      this.toastr.ShowMessage(result.message,"Dosya Ekleme İşlemi Başarısız",ToastrMessageType.Success,ToastrPositon.BottomFullWidth)

    this.hideSpinner();
    this.filter();
  }
  async filter(){
    const fileTitle:string =  this.fileTitleFilter.nativeElement.value;
    const fileNote:string =  this.fileNoteFilter.nativeElement.value;
    const filterPackage:GetFilterFileResquest={
      SellerID:this.sellerId,
      FileNote:fileNote,
      FileTitle:fileTitle
    };
    this.showSpinner();
    await this.fileService.FilterFile(filterPackage).subscribe({
      next: (filesDatas: object | GetFilterFileResponse | any) => {
        this.files = filesDatas.files;
      }
    });
    this.hideSpinner();
  }
  async filterPackage(){
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
  clearFilterPackage(){
    this.filterName.nativeElement.value="";
    this.filterPaperSize.nativeElement.selectedIndex =0;
    this.filterPaperType.nativeElement.selectedIndex =0;
    this.filterSheetsPerPage.nativeElement.selectedIndex =0;
    this.filterDuplexMode.nativeElement.selectedIndex =0;
    this.filterColorMode.nativeElement.selectedIndex =0;
  }
  async createProductModal(){
    this.createProduct.Quantity = this.productQuantityModal.nativeElement.value;
    this.createProduct.customerNote = this.productNoteModal.nativeElement.value;
    if(this.customFile){
      const formData = new FormData();
      const fileInput = this.fileContentModal.nativeElement;
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        formData.append('FileContent', file, file.name);
        formData.append('FileTitle',this.fileTitleModal.nativeElement.value);
        formData.append('FileNote',this.fileNoteModal.nativeElement.value);
        formData.append('Quantity',this.createProduct.Quantity.toString());
        formData.append('AppSellerID',this.sellerId);
        formData.append('PackageID',this.createProduct.packageID);
        formData.append('CustomerNote',this.createProduct.customerNote);
      }
      this.showSpinner();
      const result:BaseResponse = await this.productService.createProductforCustomer(formData);
      this.hideSpinner();
      if(result.succeeded)
        this.toastr.ShowMessage(result.message,"Ürün Ekleme İşlemi Başarılı",ToastrMessageType.Success,ToastrPositon.BottomFullWidth)
      else
        this.toastr.ShowMessage(result.message,"Ürün Ekleme İşlemi Başarısız",ToastrMessageType.Success,ToastrPositon.BottomFullWidth)
    }
    else{
      this.showSpinner();
      const result: BaseResponse = await this.productService.createProduct(this.createProduct);
      this.hideSpinner();
      if (result.succeeded) {
        this.toastr.ShowMessage(result.message, "Ürün Ekleme Başarılı", ToastrMessageType.Success, ToastrPositon.BottomFullWidth);
      } else {
        this.toastr.ShowMessage(result.message, "Ürün Ekleme Başarısız", ToastrMessageType.Error, ToastrPositon.BottomFullWidth);
      }
    }  
    
  }
  validateForm(event: Event): void {
    event.preventDefault(); // Prevent default form submission
    const form = document.getElementById('fileFeaturesForm') as HTMLFormElement;
    if (form.checkValidity()) {
      form.classList.add('was-validated');
      this.nextClickSelectPackage(); // Call nextClickSelectPackage if form is valid
    } else {
      form.classList.add('was-validated');
    }
  }
}
