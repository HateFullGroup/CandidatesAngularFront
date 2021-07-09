import { Component, OnInit } from '@angular/core';
import {CandidatesService} from "../services/candidates.service";
import {getTechnologies, Tech} from "../../../shared/interfaces";
import {TitleService} from "../services/title.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-technologies-page',
  templateUrl: './technologies-page.component.html',
  styleUrls: ['./technologies-page.component.css']
})
export class TechnologiesPageComponent implements OnInit {

  candidatesService!: CandidatesService
  technology!: getTechnologies[]
  searchTechnologies!: getTechnologies[]
  private router!: Router

  searchInput = ''
  searchTemp = ''

  constructor(all: CandidatesService, title: TitleService, router: Router) {
    this.router = router
    this.candidatesService = all
    title.setTitle('Технологии')
  }

  ngOnInit(): void {
    this.fetchTechnologies()
  }

  getInput(event: any) {
    this.searchInput = event.target?.value
  }

  submitSearch() {
    this.searchTemp = this.searchInput
    if(this.searchTemp != ''){
      this.searchTechnologies = this.technology.filter(x => x.name.toLowerCase() === this.searchTemp.toLowerCase())
    } else {
      this.searchTechnologies = this.technology
    }

  }

  fetchTechnologies() {
    this.candidatesService.getTechnologies()
        .subscribe(src => {
          this.technology = src.results
          this.searchTechnologies = this.technology
        })
  }

  editTechnology(id: number, name: string) {
    this.router.navigate(['home','addTechnologies'], {queryParams: {id_tech: id, name_tech: name}})
  }
}
