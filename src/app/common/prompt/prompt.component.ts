import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Observable } from 'rxjs/Rx';

export interface PromptModel {
  title:string;
  message:string;
   
}

@Component({
  selector: 'prompt',
  templateUrl: `./prompt.component.html`
})
export class PromptComponent extends DialogComponent<PromptModel, string>  {
  title: string;
  // question: string; 
  message: string = '';


  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  
  apply() {            
    this.result = this.message;
    this.close();
  } 
}