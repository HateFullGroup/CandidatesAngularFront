import { Component, OnInit } from '@angular/core';
import {HomePageComponent} from "../../home-page.component";
import {candidates, getCandidates, getRoot, Tech} from "../../../shared/interfaces";
import {CandidatesService} from "../services/candidates.service";
import {TitleService} from "../services/title.service";

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
  allInformation!: getRoot
  newCandidates!: getCandidates[]

  constructor(home: HomePageComponent, candidatesService: CandidatesService, title: TitleService) {
    this.home = home
    this.candidatesService = candidatesService
    title.setTitle('Кандидаты')
  }

  ngOnInit(): void {
    this.technologies = this.candidatesService.technologies
    this.candidates = this.candidatesService.candidates
    this.fetchCandidate()
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

  fetchCandidate() {
    this.candidatesService.getCandidates()
      .subscribe(src => {
        this.allInformation = src
        this.newCandidates = this.allInformation.results
        this.allInformation.results.map(k => {
          this.newCandidates.push(k)
        })
        console.log(this.newCandidates)
      })
  }

}
