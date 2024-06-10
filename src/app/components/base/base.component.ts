import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner:NgxSpinnerService){
  }
  showSpinner(){
    this.spinner.show("ngxSpinner");
  }
  hideSpinner(){
    this.spinner.hide("ngxSpinner");
  }
}
