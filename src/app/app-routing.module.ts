import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {CandidatePageComponent} from "./home-page/shared/candidate-page/candidate-page.component";
import {TechnologiesPageComponent} from "./home-page/shared/technologies-page/technologies-page.component";
import {AddCandidatePageComponent} from "./home-page/shared/add-candidate-page/add-candidate-page.component";
import {AddTechnologiesPageComponent} from "./home-page/shared/add-technologies-page/add-technologies-page.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent, pathMatch: 'full'},
  {path: 'home', component: HomePageComponent, children: [
      {path: '', component: CandidatePageComponent},
      {path: 'technologies', component: TechnologiesPageComponent},
      {path: 'addCandidate', component: AddCandidatePageComponent},
      {path: 'addTechnologies', component: AddTechnologiesPageComponent},
      {path: '**', redirectTo: '', component: HomePageComponent}
    ]},
  {path: '**', redirectTo: '', component: LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
