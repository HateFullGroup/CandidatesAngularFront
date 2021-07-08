import { Component, OnInit } from '@angular/core';
import {CandidatesService} from "../services/candidates.service";
import {KnowledgeLevels, Tech} from "../../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-add-candidate-page',
  templateUrl: './add-candidate-page.component.html',
  styleUrls: ['./add-candidate-page.component.css']
})
export class AddCandidatePageComponent implements OnInit {

  candidates!: CandidatesService
  technology!: Tech[]
  form!: FormGroup
  levels!: FormGroup

  setLevels = [
    {technology: 'PHP', level: 0},
    {technology: 'Java', level: 0},
    {technology: 'Python', level: 0}
  ]

  knowledgeLevels: KnowledgeLevels[] = [
    {name: 'PHP'},
    {name: 'Java'},
    {name: 'Python'},
  ]


  constructor(candidates: CandidatesService) {
    this.candidates = candidates
  }

  ngOnInit(): void {
    this.technology = this.candidates.technologies
    this.levels = new FormGroup({})
    this.knowledgeLevels.map(klvl => {
      this.levels.addControl(klvl.name, new FormControl(0))
    })

    this.form = new FormGroup({
      fio: new FormControl('', Validators.required),
      workspace: new FormControl('', Validators.required),
      price: new FormControl(null, Validators.required),
      position: new FormControl('', Validators.required),
      description: new FormControl(''),
      review: new FormControl(''),
    })

    this.form.addControl('levels', this.levels)
  }

  submit() {

    console.log(this.form.value)

    this.form.reset()
    this.knowledgeLevels.map( kLvls => {
      this.setLevels.map(sLvls => {
        if(kLvls.name === sLvls.technology){
          sLvls.level = 0
        }
      })
    })
  }

  setLevel(id: number | any, tech: string) {
    this.setLevels.map( lvl => {
      if(lvl.technology === tech){
        if (lvl.level === id){
          lvl.level--
        }else {
          lvl.level = id
        }
        this.form.get('levels')?.get(tech)?.patchValue(lvl.level)
      }
    })

  }

  getLevel(tech: string): any{
    return this.setLevels.find(x => x.technology === tech)?.level
  }
}
