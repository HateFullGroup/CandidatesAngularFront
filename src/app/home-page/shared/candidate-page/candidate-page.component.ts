import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {HomePageComponent} from "../../home-page.component";
import {candidates, getCandidates, getTechnologies, getTechnologiesRoot, getRootCandidates, Tech} from "../../../shared/interfaces";
import {CandidatesService} from "../services/candidates.service";
import {TitleService} from "../services/title.service";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDateRangeInput, MatDateRangePicker} from "@angular/material/datepicker";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Params, Router} from "@angular/router";

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
  disabledTechnologies: string[] = []
  // candidates!: candidates[]
  // allInformation!: getRootCandidates
  allCandidates!: getCandidates[]
  fioQuery!: string
  dateForm!: FormGroup
  fioInput!: FormControl;
  min = new Date(2000, 1, 1)
  max = new Date()
  startAt = new Date(2014, 1, 1)
  complete = false
  firstComplete = true
  candidatesData!: MatTableDataSource<any>
  displayedColumns: string[] = ['index', 'f_i_o', 'birth_date', 'candidatetechnology_set', 'description', 'details']
  widthLoading = 100
  filterFunctions: any
  filterTerms: any

  deletedCandFio!: string
  @ViewChild(MatDateRangeInput) private rangeInput!: MatDateRangeInput<Date>;
  @ViewChild(MatDateRangePicker) private rangePicker!: MatDateRangePicker<Date>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private router!: Router;

  constructor(home: HomePageComponent, candidatesService: CandidatesService, title: TitleService, private fb: FormBuilder, router: Router, query: ActivatedRoute) {
    this.home = home
    this.router = router
    this.candidatesService = candidatesService
    title.setTitle('Кандидаты')
    query.queryParams.subscribe( (params: Params) => {
      if(!!params.complete && this.firstComplete){
        this.deletedCandFio = params.deletedCandFio
        this.complete = !!params.complete
        setTimeout(()=>{
          this.complete = false
          this.firstComplete = false
        }, 1500)
      }
    })
  }

  ngOnInit(): void {

    // this.searchForm = this.fb.group({
    //   daterange: new FormGroup({
    //     start: new FormControl(),
    //     end: new FormControl(),
    //   }),
    // })

    this.fioInput = new FormControl()
    this.dateForm = this.fb.group({
      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
    })
    this.dateForm.valueChanges.subscribe((v) => {
      this.applyDateFilter()
    });
    this.fioInput.valueChanges.subscribe((v) => {
      this.applyFioFilter()
    });
    // this.technologies = this.candidatesService.technologies
    // this.allInformation = this.candidatesService.getCandidates()
    this.fetchTechnologies()
    this.fetchCandidate()
  }

  onInput(event: any) {
    this.name = event.target?.value
  }

  onCheck(technology: string) {
    let ind: number = this.technologies.findIndex(t => t.name === technology)
    if (this.technologies[ind].check) {
      this.disabledTechnologies.push(technology)
    }
    else {
      this.disabledTechnologies = this.disabledTechnologies.filter(t => t != technology)
    }
    this.technologies[ind].check = !this.technologies[ind].check

  }


  fetchCandidate() {
    this.candidatesService.getCandidates()
      .subscribe(src => {
        this.allCandidates = src.results
        this.candidatesData = new MatTableDataSource(src.results)
        this.candidatesData.sort = this.sort
        this.candidatesData.paginator = this.paginator
        this.candidatesData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return (ele == 'f_i_o') && (data[ele].toLowerCase().indexOf(filter) != -1)
          })
        }
        console.log(src)
      })
  }

  private fetchTechnologies() {
    this.candidatesService.getTechnologies()
        .subscribe(src => {
          this.technologies = src.results
          this.technologies.map(x => x.check = true)
          console.log(this.technologies)
        })
  }

  trackByIdx(index: number, obj: any): any {
    return index
  }

  onFioSearchClear() {
    this.fioQuery = ''
  }

  applyFioFilter() {
    this.candidatesData.filter = this.fioQuery.trim().toLowerCase()
  }

  applyDateFilter() {
    this.candidatesData.data = JSON.parse(JSON.stringify(this.allCandidates))
    this.candidatesData.data = this.candidatesData.data.filter(e=> {
      let start: any = Date.parse(this.dateForm.value.daterange.start)
      let end: any = Date.parse(this.dateForm.value.daterange.end)
      let addedAt: any = Date.parse(e.added_at)
      return (addedAt >= start) && (addedAt <= end)
    })
  }

  editCandidate(id: number) {
    this.router.navigate(['home','addCandidate'], {queryParams: {id: id}})

  }
}