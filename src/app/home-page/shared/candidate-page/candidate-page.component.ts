import { Component, OnInit } from '@angular/core';
import {HomePageComponent} from "../../home-page.component";
import {candidates, Tech} from "../../../shared/interfaces";
import {CandidatesService} from "../services/candidates.service";

@Component({
  selector: 'app-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.css']
})
export class CandidatePageComponent implements OnInit {

  name = ''
  home!: HomePageComponent
  candidatesService!: CandidatesService
  technologies!: Tech[]
  candidates!: candidates[]

  constructor(home: HomePageComponent, candidatesService: CandidatesService) {
    this.home = home
    this.candidatesService = candidatesService
  }

  ngOnInit(): void {
    this.technologies = this.candidatesService.technologies
    this.candidates = this.candidatesService.candidates
  }

  onInput(event: any) {
    this.name = event.target?.value
  }

  onCheck(technology: string) {
    this.technologies.map(o => {
      if(o.technology === technology) {
        o.check = !o.check
      }
    })
  }
}
