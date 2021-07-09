import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CandidatePageComponent } from './home-page/shared/candidate-page/candidate-page.component';
import { CandidateComponent } from './home-page/shared/candidate-page/candidate/candidate.component';
import { TechnologiesPageComponent } from './home-page/shared/technologies-page/technologies-page.component';
import { AddCandidatePageComponent } from './home-page/shared/add-candidate-page/add-candidate-page.component';
import { AddTechnologiesPageComponent } from './home-page/shared/add-technologies-page/add-technologies-page.component';
import {HttpClientModule} from "@angular/common/http";
import { TestComponent } from './home-page/shared/candidate-page/test/test.component';
import {AuthModule} from "./auth/auth.module";

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
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
