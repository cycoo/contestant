import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import { Contestant} from '../models/contestant.model';

import { ContestantService} from '../models/contestant.service';

import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { FileUploadComponent } from "../common/file-upload/file-upload.component";

import { PromptComponent } from "../common/prompt/prompt.component";


@Component({
    selector: 'appContestant',
    templateUrl: 'Contestant.component.html'
})


export class ContestantComponent  implements AfterViewInit {
    showDialog = false;
    showEditDialog=false;

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

    selectedDistrict:string="1";
    title:string='';
    editGender:string='';
    removeImagePreview:boolean=false;

    @ViewChild('uploadComponentAdd')
    private uploadComponentAdd: FileUploadComponent;
    @ViewChild('uploadComponentEdit')
    private uploadComponentEdit: FileUploadComponent;

    private sortIcon = {
        Name: "asc",
        UserName: "asc",
        Region: "asc"
    };
    sortAscending: boolean = true;

    promptMessage:string = '';

    constructor(@Inject(DOCUMENT) private document: Document,private contestantService:ContestantService,private dialogService:DialogService) {
        ;
        this.objContestantAdd = new Contestant();
        this.addIsActive = false;        
    }

    ngAfterViewInit(): void {
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        this.uploadComponentAdd.showImageComponent("Upload Image (200 x 200 Pixels; Max 2 mb)");
        this.uploadComponentEdit.showImageComponent("Upload Image (200 x 200 Pixels; Max 2 mb)");
        
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
                
        // console.log(this.objContestantList);
                this.objContestantListLength=this.objContestantList.length;
                this.objDistrictList=Contestant.Districts;
                this.loadingData = false;
            },
            error => {
                alert('Error loading data.')
                this.loadingData = false;
            });
    }

    showPromptEdit(contestant:Contestant):void{        
        if(contestant.is_active=="1"){
            this.editIsActive=true;
        }else{
            this.editIsActive=false;
        }
        if(this.removeImagePreview){            
            this.removeImagePreview=!this.removeImagePreview;
        }

        this.title='Contestant Edit Form';
        this.objContestantEdit=contestant;
        this.objDistrictList=this.objDistrictList;
        this.editGender=contestant.gender;
        this.showEditDialog=!this.showEditDialog;

        //image upload
        // this.objContestantEdit.PhotoPreview = contestant.photo_url;
        this.uploadComponentEdit.resetImageComponent();
        this.objContestantEdit.ImageDeletedOnEdit = false;
        // this.uploadComponentEdit.initDataImage(contestant.photo_url, "http://localhost/contestant/uploads/contestant/" + contestant.photo_url);
        
    }

    showPromptAdd():void {
            this.title='Contestant Add Form';
            this.showDialog =!this.showDialog;
            this.objContestantAdd.district_id="1";
            this.objDistrictList=this.objDistrictList;            
            this.uploadComponentAdd.resetImageComponent();
            // this.objContestantAdd.ImageDeletedOnEdit= false;
    }

    addContestant(): void {
            // if (this.editIsActive) {
            //     this.objContestantEdit.IsActive = 1;
            // } else {
            //     this.objContestantEdit.IsActive = 0;
            // }
            // if (this.validationService.Contestant(this.objContestantEdit)) { 
            //     console.log(this.objContestantAdd.district_id);  
            // this.objContestantAdd.district_id=this.objDistrictList.find(x => x.name ===this.objContestantAdd.district_id);
              
            console.log(this.objContestantAdd.district_id);
                this.savingAddData = true;

                if(this.objContestantAdd.is_active){
                    this.objContestantAdd.is_active="1";
                }else{
                    this.objContestantAdd.is_active="0";
                }
                let operation: Observable<Contestant>;

                operation = this.contestantService.addContestant(this.objContestantAdd);
                operation.subscribe(
                    
                    user => {
                        // this.goToTop();
                        this.reloadData();
                        this.savingAddData = false;
                        setTimeout(
                        //     ()
                        //  => {
                        //     this.clearEditForm();
                        // },
                         200);
                    },
                    error => {
                        // this.alertService.alertWarning(error)
                        alert(error);
                        this.savingAddData = false;
                    });

                    this.showDialog=!this.showDialog;
    // }
    }

    updateContestant(): void {
            // if (this.editIsActive) {
            //     this.objContestantEdit.IsActive = 1;
            // } else {
            //     this.objContestantEdit.IsActive = 0;
            // }
            // if (this.validationService.Contestant(this.objContestantEdit)) {            
                this.savingEditData = true;
                let operation: Observable<Contestant>;

                operation = this.contestantService.updateContestant(this.objContestantEdit);
                operation.subscribe(
                    
                    user => {
                        // this.goToTop();
                        this.reloadData();
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

                    this.showEditDialog=!this.showEditDialog;
    // }
    }

    removeImage():void{
        this.removeImagePreview=!this.removeImagePreview;
    }

    uploadAddImage(imageFile: File) {
        this.objContestantAdd.photo = imageFile;
    }

    uploadEditImage(imageFile: File) {
        this.objContestantEdit.photo = imageFile;
        if (!imageFile) {
            this.objContestantEdit.ImageDeletedOnEdit = true;
        }
    }

    gender(gender:string){
        this.objContestantAdd.gender=gender;
    }

    close(action:string):void{
        if(action=='add'){
            this.showDialog=false;
            this.savingAddData=false;
        }else{
            this.showEditDialog=!this.showEditDialog;
            this.savingEditData=!this.savingEditData;
        }
    }

    deleteMobileUser(e,obj: Contestant) {
          e.stopPropagation();
            //We get dialog result
            let operation: Observable<Contestant>;
            operation = this.contestantService.deleteContestant(obj);
            operation.subscribe(
            user => {
                // this.goToTop();
                this.reloadData();
            },
            error => {
                // this.alertService.alertWarning(error)
                alert(error);
            });


    }

      deleteContestant(e,obj: Contestant) {
          e.stopPropagation();
        let disposable = this.dialogService.addDialog(PromptComponent, {
            title: 'Delete',
            message: 'Do you want to delete?'
        })
        .subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {
                let operation: Observable<Contestant>;
                operation = this.contestantService.deleteContestant(obj);
                operation.subscribe(
                    user => {
                        // this.goToTop();
                        this.reloadData();
                    },
                    error => {
                        // this.alertService.alertWarning(error)
                        alert(error);
                    });
            }

        });
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

    saveEditData(): void {

        // if (this.editIsActive) {
        //     this.objContestantEdit.IsActive = 1;
        // } else {
        //     this.objContestantEdit.IsActive = 0;
        // }
        // if (this.validationService.Contestant(this.objContestantEdit)) {

            this.savingEditData = true;
            let operation: Observable<Contestant>;
            operation = this.contestantService.updateContestant(this.objContestantEdit);
            operation.subscribe(
                user => {
                    // this.goToTop();
                    this.reloadData();
                    this.savingEditData = false;
                    setTimeout(() => {
                        // this.clearEditForm();
                    }, 200);


                },
                error => {
                    // this.alertService.alertWarning(error)
                    alert(error);
                    this.savingEditData = false;
                });
        // }
    }

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
