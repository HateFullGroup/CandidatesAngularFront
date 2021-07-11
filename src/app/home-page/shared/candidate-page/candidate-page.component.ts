import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {HomePageComponent} from "../../home-page.component";
import {candidates, getCandidates, getTechnologies, getTechnologiesRoot, getRootCandidates, Tech} from "../../../shared/interfaces";
import {CandidatesService} from "../services/candidates.service";
import {TitleService} from "../services/title.service";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDateRangeInput, MatDateRangePicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.css']
})
export class CandidatePageComponent implements OnInit {

  name = ''
  home!: HomePageComponent
  candidatesService!: CandidatesService
  technologies!: getTechnologies[]
  candidates!: candidates[]
  allInformation!: getRootCandidates
  newCandidates!: getCandidates[]
  fioQuery!: string
  dateForm!: FormGroup
  min = new Date(2000, 1, 1)
  max = new Date()
  startAt = new Date(2014, 1, 1)

  @ViewChild(MatDateRangeInput) private rangeInput!: MatDateRangeInput<Date>;
  @ViewChild(MatDateRangePicker) private rangePicker!: MatDateRangePicker<Date>;
  constructor(home: HomePageComponent, candidatesService: CandidatesService, title: TitleService, private fb: FormBuilder) {
    this.home = home
    this.candidatesService = candidatesService
    title.setTitle('Кандидаты')
  }

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
    })
    // this.technologies = this.candidatesService.technologies
    // this.allInformation = this.candidatesService.getCandidates()
    this.fetchTechnologies()
    this.fetchCandidate()
  }

  onInput(event: any) {
    this.name = event.target?.value
  }

  onCheck(technology: string) {
    this.technologies.map(o => {
      if(o.name === technology) {
        o.check = !o.check
      }
    })
  }

  fetchCandidate() {
    this.candidatesService.getCandidates()
      .subscribe(src => {
        this.newCandidates = src.results
        // console.log(this.newCandidates)
      })
  }

  private fetchTechnologies() {
    this.candidatesService.getTechnologies()
        .subscribe(src => {
          this.technologies = src.results
          this.technologies.map(x => x.check = true)
          // console.log(this.technologies)
        })
  }

  trackByIdx(index: number, obj: any): any {
    return index
  }

}


