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
  // newCandidates!: getCandidates[]
  fioQuery!: string
  dateForm!: FormGroup
  fioInput!: FormControl;
  min = new Date(2000, 1, 1)
  max = new Date()
  startAt = new Date(2014, 1, 1)

  candidatesData!: MatTableDataSource<any>
  displayedColumns: string[] = ['f_i_o', 'birth_date', 'candidatetechnology_set', 'description', 'details']

  filterFunctions: any
  filterTerms: any

  @ViewChild(MatDateRangeInput) private rangeInput!: MatDateRangeInput<Date>;
  @ViewChild(MatDateRangePicker) private rangePicker!: MatDateRangePicker<Date>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(home: HomePageComponent, candidatesService: CandidatesService, title: TitleService, private fb: FormBuilder) {
    this.home = home
    this.candidatesService = candidatesService
    title.setTitle('Кандидаты')
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
      birth_date: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
    })
    this.filterTerms = {
      'f_i_o': this.fioInput,
      'birth_date': this.dateForm
    }

    this.filterFunctions = {
      'f_i_o': function (value: string, query: string) {
        return value.toLowerCase().indexOf(query.trim().toLowerCase()) != -1
      },
      'birth_date': function(value: string, query: FormGroup) {
        return
      }
    }
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
    // this.technologies.map(o => {
    //   if(o.name === technology) {
    //     o.check = !o.check
    //   }
    // })
  }


  // filterFunctions['f_i_']


  fetchCandidate() {
    this.candidatesService.getCandidates()
      .subscribe(src => {
        // this.newCandidates = src.results
        this.candidatesData = new MatTableDataSource(src.results)
        this.candidatesData.sort = this.sort
        this.candidatesData.paginator = this.paginator
        this.candidatesData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            // return ele == 'f_i_o' && data[ele].toLowerCase().indexOf(filter) != -1
            (ele in this.filterFunctions) && (this.filterFunctions[ele](data[ele]))
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

  applyFilter() {
    // this.candidatesData.filter = this.fioQuery.trim().toLowerCase()
    // for (let candidate of this.candidatesData.data) {
    //   for (let term in candidate) {
    //     if (term in this.filterFunctions) {
    //       this.filterFunctions[term](candidate[term], this.filterTerms[term].value)
    //     }
    //   }
    // }
    if (this.candidatesData.filter == '1') {
      this.candidatesData.filter = '0'
    }
    else {
      this.candidatesData.filter = '1'
    }
  }

}