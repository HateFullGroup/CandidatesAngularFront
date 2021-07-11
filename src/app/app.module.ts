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
import {TextSearchPipe} from "./pipes/textSearch.pipe";
import {TechSearchPipe} from "./pipes/techSearch.pipe";
import {DateRangeSearchPipe} from "./pipes/dateRangeSearch";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MY_FORMATS} from "./config";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from "@angular/material/grid-list";
import {TechnologiesPageDirective} from "./home-page/shared/technologies-page/directives/technologies-page.directive";

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
        TextSearchPipe,
        TechSearchPipe,
        DateRangeSearchPipe,
        TechnologiesPageDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatSortModule,
        MatInputModule,
        FormsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatChipsModule,
        MatGridListModule
    ],
  providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
