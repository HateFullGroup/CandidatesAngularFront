import {Component, Input, OnInit} from '@angular/core';
import {candidates, getCandidates} from "../../../../shared/interfaces";

@Component({
  selector: '[app-candidate]',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  @Input('candidateInfo') candidateInfo!: getCandidates
  @Input('idx') idx!: number

  constructor() {

  }

  ngOnInit(): void {

  }

}
