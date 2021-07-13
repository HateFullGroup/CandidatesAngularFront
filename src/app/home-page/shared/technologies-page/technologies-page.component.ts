import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {CandidatesService} from "../services/candidates.service";
import {getTechnologies, Tech} from "../../../shared/interfaces";
import {TitleService} from "../services/title.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

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

  @Input() load!: ElementRef

  searchInput = ''
  searchTemp = ''
  widthLoading = 100
  complete = false
  deletedTech!: string;

  technologiesData!: MatTableDataSource<any>
  displayedColumns: string[] = ['index', 'name']

  constructor(all: CandidatesService, title: TitleService, router: Router, query: ActivatedRoute) {
    this.router = router
    this.candidatesService = all
    title.setTitle('Технологии')
    query.queryParams.subscribe( (params: Params) => {
      if(!!params.complete){
        this.deletedTech = params.deletedTechName
        this.complete = !!params.complete
        setTimeout(()=>{
          this.complete = false
        }, 2500)
      }
    })
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
          this.technologiesData = new MatTableDataSource<any>(src.results)
          // this.searchTechnologies = this.technology
        })
  }

  editTechnology(id: number, name: string) {
    this.router.navigate(['home','addTechnologies'], {queryParams: {id_tech: id, name_tech: name}})
  }
}
