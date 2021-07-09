import {Component, Input, OnInit} from '@angular/core';
import { candidates } from "../../../../shared/interfaces";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  @Input('candidateInfo') candidateInfo!: candidates

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.candidateInfo)
  }

}
