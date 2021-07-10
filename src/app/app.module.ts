import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CandidatePageComponent} from './home-page/shared/candidate-page/candidate-page.component';
import { CandidateComponent } from './home-page/shared/candidate-page/candidate/candidate.component';
import { TechnologiesPageComponent } from './home-page/shared/technologies-page/technologies-page.component';
import { AddCandidatePageComponent } from './home-page/shared/add-candidate-page/add-candidate-page.component';
import { AddTechnologiesPageComponent } from './home-page/shared/add-technologies-page/add-technologies-page.component';
import {HttpClientModule} from "@angular/common/http";
import { TestComponent } from './home-page/shared/candidate-page/test/test.component';
import {AuthModule} from "./auth/auth.module";
// import {MatDatepickerModule} from '@angular/materinjjal/datepicker';
import {NgbDatepicker, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {fioSearchPipe} from "./pipes/fioSearch.pipe";
import {TechSearchPipe} from "./pipes/techSearch.pipe";
import { NgbdDatepickerRangeComponent } from './home-page/shared/candidate-page/ngbd-datepicker-range/ngbd-datepicker-range.component';
// import {NgbdDatepickerRangeModule} from "./home-page/shared/candidate-page/ngbd-datepicker-range/ngbd-datepicker-range.module";

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        LoginPageComponent,
        CandidatePageComponent,
        TechnologiesPageComponent,
        AddCandidatePageComponent,
        AddTechnologiesPageComponent,
        CandidateComponent,
        TestComponent,
        fioSearchPipe,
        TechSearchPipe,
        NgbdDatepickerRangeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthModule,
        FormsModule,
        NgbDatepickerModule,
        // NgbdDatepickerRangeModule
        // MatDatepickerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
