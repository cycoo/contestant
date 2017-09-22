import { Component,OnInit } from '@angular/core';

import { ContestantService} from './models/contestant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  objContestantList:any;
  objContestantListLenght:number;
  loadingData=true;
  constructor(private contestantService: ContestantService) { }
  ngOnInit():void{
    this.reloadData();
  }

   reloadData(): void {
        this.objContestantList = [];
        this.contestantService
            .getContestants()//
            .subscribe(
            contestant => {
              this.objContestantList= contestant.Contestant;
              this.objContestantListLenght=this.objContestantList.length;
                this.loadingData = false;
            },
            error => {
                this.loadingData = false;
            });
    }
  
 }
