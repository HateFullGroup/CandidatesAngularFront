import { Component, OnInit } from '@angular/core';
import {CandidatesService} from "../services/candidates.service";
import {Tech} from "../../../shared/interfaces";

@Component({
  selector: 'app-technologies-page',
  templateUrl: './technologies-page.component.html',
  styleUrls: ['./technologies-page.component.css']
})
export class TechnologiesPageComponent implements OnInit {

  all!: CandidatesService
  technology!: Tech[]

  constructor(all: CandidatesService) {
    this.all = all
  }

  ngOnInit(): void {
    this.technology = this.all?.technologies
  }

}
