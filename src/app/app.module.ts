import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppRoutingModule }   from './app-routing.module';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { CommonModule } from "@angular/common";
import{SelectModule} from 'ng2-select';

import { ContestantService } from './models/contestant.service';

import { AppComponent } from './app.component';
import { ContestantComponent } from './contestant/contestant.component';
import { PromptComponent } from './prompt/prompt.component';

@NgModule({
  declarations: [
    AppComponent,
    ContestantComponent,
    PromptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BootstrapModalModule,
    CommonModule,
    SelectModule
  ],
  entryComponents: [
    PromptComponent
  ],
  providers: [ContestantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
