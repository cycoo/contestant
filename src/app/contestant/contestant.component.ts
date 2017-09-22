import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import { Contestant} from '../models/contestant.model';

import { ContestantService} from '../models/contestant.service';

import { PromptComponent } from '../prompt/prompt.component';

import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({
    selector: 'appContestant',
    templateUrl: 'Contestant.component.html'
})


export class ContestantComponent extends DialogComponent<Contestant, string> implements AfterViewInit {
    objContestantAdd: Contestant = new Contestant();
    objContestantEdit: Contestant = new Contestant();
    objContestantList: Array<Contestant> = new Array<Contestant>();
    objContestantListLength:number;

    objDistrictList:any;

    addIsActive: boolean = false;
    editIsActive: boolean = false;

    searchQuery: string = '';
    loadingData: boolean = false;
    savingAddData: boolean = false;
    savingEditData: boolean = false;

    editContestantModalHide:boolean=false;

    private sortIcon = {
        Name: "asc",
        UserName: "asc",
        Region: "asc"
    };
    sortAscending: boolean = true;

    promptMessage:string = '';

    constructor(
       private dialogServiceContestant:DialogService, @Inject(DOCUMENT) private document: Document,private contestantService:ContestantService) {
        super(dialogServiceContestant);
        this.objContestantAdd = new Contestant();
        this.addIsActive = false;        
    }

    ngAfterViewInit(): void {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.reloadData();
    }

    reloadData(): void {
        this.loadingData = true;
        this.objContestantList = [];
        this.contestantService
            .getContestants()//
            .subscribe(
            Contestant => {
                this.objContestantList= Contestant.Contestant;
                
        console.log(this.objContestantList);
                this.objContestantListLength=this.objContestantList.length;
                this.objDistrictList=Contestant.Districts;
                this.loadingData = false;
            },
            error => {
                alert('Error loading data.')
                this.loadingData = false;
            });
    }

    showPromptEdit(contestant:Contestant) {
        let editIsActive;
        if(contestant.is_active=="1"){
            editIsActive=true;
        }else{
            editIsActive=false;
        }
    this.dialogServiceContestant.addDialog(PromptComponent,{
    title:'Contestant Edit Form',
    objContestantEdit:contestant,
    editContestantModal:true,
    objDistrictList:this.objDistrictList,
    editIsActive:editIsActive,
    editGender:contestant.gender
    })
      .subscribe(
          Contestant => {

            },
            error => {
                alert('Error loading data.')
                this.loadingData = false;
            }
      );
  }

  showPromptAdd() {
    this.dialogServiceContestant.addDialog(PromptComponent,{
    title:'Contestant Add Form',
    addContestantModal:true,
    objDistrictList:this.objDistrictList
    })
      .subscribe(
          Contestant => {

            },
            error => {
                alert('Error loading data.')
                this.loadingData = false;
            }
      );
  }

  

    // getRegions() {
    //     this.userService.getRegions()
    //         .subscribe(
    //         regions => {
    //             let regionitem = new Array<SelectItem>();
    //             for (var obj of regions) {
    //                 let select = new SelectItem();
    //                 select.id = obj.ID.toString();
    //                 select.text = obj.RegionName;
    //                 regionitem.push(select);
    //             }
    //             this.regionList = regionitem;
    //         }
    //         )
    // }
        
    // saveAddData(): void {
    //     if (this.addIsActive) {
    //         this.objContestantAdd.IsActive = 1;
    //     } else {
    //         this.objContestantAdd.IsActive = 0;
    //     }

    //     if (this.validationService.Contestant(this.objContestantAdd)) {
    //         this.savingAddData = true;
    //         let operation: Observable<Contestant>;
    //         operation = this.ContestantService.addContestant(this.objContestantAdd)
    //         operation.subscribe(
    //             announce => {
    //                 this.goToTop();
    //                 this.reloadData();
    //                 this.clearAddForm();
    //                 this.savingAddData = false;
    //             },
    //             error => {
    //                 this.alertService.alertWarning(error);
    //                 this.savingAddData = false;
    //             });
    //     }
    // }

    // saveEditData(): void {

    //     if (this.editIsActive) {
    //         this.objContestantEdit.IsActive = 1;
    //     } else {
    //         this.objContestantEdit.IsActive = 0;
    //     }
    //     if (this.validationService.Contestant(this.objContestantEdit)) {

    //         this.savingEditData = true;
    //         let operation: Observable<Contestant>;
    //         operation = this.ContestantService.updateContestant(this.objContestantEdit);
    //         operation.subscribe(
    //             user => {
    //                 this.goToTop();
    //                 this.reloadData();
    //                 this.savingEditData = false;
    //                 setTimeout(() => {
    //                     this.clearEditForm();
    //                 }, 200);


    //             },
    //             error => {
    //                 this.alertService.alertWarning(error)
    //                 this.savingEditData = false;
    //             });
    //     }
    // }

    // editData(objContestant: Contestant): void {
    //     this.clearEditForm();
    //     objContestant.Contestant == null ? '' : objContestant.Contestant;
    //     objContestant.ContestantPoster == null ? '' : objContestant.ContestantPoster;
    //     //this.objContestantEdit = objContestant;

    //     this.objContestantEdit.ID = objContestant.ID;
    //     this.objContestantEdit.ContestantContent = objContestant.ContestantContent;
    //     this.objContestantEdit.ContestantRegionID = objContestant.ContestantRegionID;
    //     this.objContestantEdit.Contestant = objContestant.Contestant;
    //     this.objContestantEdit.ContestantFile = objContestant.ContestantFile;
    //     this.objContestantEdit.ContestantTitle = objContestant.ContestantTitle;
    //     this.objContestantEdit.PublishedDateFrom = objContestant.PublishedDateFrom;
    //     this.objContestantEdit.PublishedDateTo = objContestant.PublishedDateTo;
    //     this.objContestantEdit.ImageFile=objContestant.ImageFile;

    //     if (objContestant.IsActive === 1) {
    //         this.editIsActive = true;
    //     } else {
    //         this.editIsActive = false;
    //     }
    //     this.editActiveRegion = this.regionList.filter(function (x) {
    //         return x.id == (objContestant.ContestantRegionID == undefined ? '' : objContestant.ContestantRegionID).toString();
    //     });

    //     this.objContestantEdit.PrevImage = objContestant.ContestantPoster;
    //     this.uploadComponentEdit.resetImageComponent();
    //     this.objContestantEdit.ImageDeletedOnEdit = false;
    //     this.uploadComponentEdit.initDataImage(objContestant.ContestantPoster, imageUrl + objContestant.ContestantPoster);
        

    //     this.objContestantEdit.PrevDoc = objContestant.Contestant;
    //     this.uploadComponentEdit.resetContestantComponent();
    //     this.objContestantEdit.ContestantDeletedOnEdit = false;
    //     this.uploadComponentEdit.initDataContestant(objContestant.Contestant);
    //     this.goToEdit();
    // }
  
}
