import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Observable } from 'rxjs/Rx';

import { ContestantService} from '../models/contestant.service';

import { Contestant} from '../models/contestant.model';

import { ContestantComponent} from '../contestant/contestant.component';

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
  objContestantEdit: Contestant=new Contestant();  
  editContestantModal:boolean=false;
  selectedDistrict:string;
  editIsActive:boolean;
  editGender:string;
  removeImagePreview:boolean=false;
  savingEditData:boolean=false;

  objContestantAdd: Contestant;
  addContestantModal:boolean;

  constructor(dialogService: DialogService,private contestantService:ContestantService) {
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
              if (value.id !== this.selectedDistrict) {
                  this.selectedDistrict = value.id
              }
          } else {
              if (value.id !== this.selectedDistrict) {
                  this.selectedDistrict = value.id;
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

  updateContestant(): void {
        // if (this.editIsActive) {
        //     this.objContestantEdit.IsActive = 1;
        // } else {
        //     this.objContestantEdit.IsActive = 0;
        // }
        // if (this.validationService.Contestant(this.objContestantEdit)) {
            // this.objContestantEdit.district_id=this.selectedDistrict;
            this.savingEditData = true;
            let operation: Observable<Contestant>;
                                console.log(this.objContestantEdit);

            operation = this.contestantService.updateContestant(this.objContestantEdit);
            operation.subscribe(
                
                user => {
                    // this.goToTop();
                    // this.contestant.reloadData();
                    this.savingEditData = true;
                    // setTimeout(() => {
                    //     this.clearEditForm();
                    // }, 200);
                },
                error => {
                    // this.alertService.alertWarning(error)
                    alert(error);
                    console.log(error);
                    this.savingEditData = false;
                });

                this.close();
// }
    }

  selectDistrict(value:any,item:any,action:string):void{
      console.log(value);
      
    if(item=="district"){
        this.selectedDistrict=value;
        if(action=="add"){

        }else{

        }
    }
  }


  

}