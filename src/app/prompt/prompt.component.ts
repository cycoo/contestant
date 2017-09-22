import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Contestant} from '../models/contestant.model';

export interface PromptModel {
  title:string;
  // question:string; 
  objDistrictList:any; 
  objContestantEdit: Contestant;
  editContestantModal:boolean;
  editIsActive:boolean;
  editGender:string;

  objContestantAdd: Contestant;
  addContestantModal:boolean;
   
}

@Component({
  selector: 'prompt',
  templateUrl: `./prompt.component.html`
})
export class PromptComponent extends DialogComponent<PromptModel, string>  {
  title: string;
  // question: string; 
  message: string = '';

  //contestant edit
  objDistrictList:any; 
  objContestantEdit: Contestant;  
  editContestantModal:boolean=false;
  seletedDistrict:string;
  editIsActive:boolean;
  editGender:string;
  removeImagePreview:boolean=false;

  objContestantAdd: Contestant;
  addContestantModal:boolean;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  
  apply() {            
    this.result = this.message;
    this.close();
  }

  //for edit
  public selectedEdit(value: any, items: string, action: string): void {
      if (items == 'district') {
          if (action == 'add') {
              if (value.id !== this.seletedDistrict) {
                  this.seletedDistrict = value.id
              }
          } else {
              if (value.id !== this.seletedDistrict) {
                  this.seletedDistrict = value.id;
              }
          }
      } 

      //   else if (items == 'polltype') {
      //     if (action == 'add') {
      //         if (value.id !== this.objPollAdd.PollType) {
      //             this.allQuestionList=[];
      //             this.addSelectedPollQuestionList=[];
      //             if (value.id == 'Survey') {
      //                 this.allQuestionList = this.allQuizSurveyQuestionList.filter(x => {
      //                     return x;
      //                 });
      //             } else {
      //                 this.allQuestionList = this.allQuizSurveyQuestionList.filter(x => {
      //                     return x.QuestionType !== 'Opinion';
      //                 });
      //             }
    
      //         }
      //         this.objPollAdd.PollType = value.id
      //     } else {
      //         this.objPollEdit.PollType = value.id
      //     }
      // } 
  }

  public refreshValueEdit(value: any): void {

  }

  removeImage(value:any,items:string):void{
    if(items=='image'){
        this.removeImagePreview=value;
    }
  }
  
}