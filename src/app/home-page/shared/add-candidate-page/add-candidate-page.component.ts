import {AfterContentInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CandidatesService} from "../services/candidates.service";
import {
  getTechnologies,
  postTechnology, postCandidate
} from "../../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TitleService} from "../services/title.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-add-candidate-page',
  templateUrl: './add-candidate-page.component.html',
  styleUrls: ['./add-candidate-page.component.css']
})
export class AddCandidatePageComponent implements OnInit, DoCheck {

  candidatesService!: CandidatesService
  technology!: getTechnologies[]
  tempTechnologies!: getTechnologies[]
  form!: FormGroup
  candidatetechnology_set!: FormGroup
  date!: Date
  private hasInArray = false
  value = ''

  formToPost!: postCandidate
  technologiesToPost: postTechnology[] = [
      {technology: 0, knowledge_level: 0}
  ]


  constructor(candidates: CandidatesService, title: TitleService) {
    this.candidatesService = candidates
    title.setTitle('Добавление кандидата')
    this.fetchTechnologies()
  }

  ngOnInit(): void {
    this.candidatetechnology_set = new FormGroup({})


    this.form = new FormGroup({
      birth_date: new FormControl('', Validators.required),
      f_i_o: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      place_of_employment: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      job_position: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      feedback: new FormControl('', Validators.required),
    })

  }

  ngDoCheck() {
    this.tempTechnologies = this.technology
  }

  submit() {
    this.technologiesToPost = this.technologiesToPost.filter(deleteName => deleteName.knowledge_level != 0)
    this.date = new Date()
    this.formToPost = {
      f_i_o: this.form.value?.f_i_o,
      added_at: formatDate(this.date, 'dd.MM.yyyy', 'en'),
      birth_date: formatDate(this.form.value.birth_date, 'dd.MM.yyyy', 'en'),
      description: this.form.value?.description,
      phone_number: this.form.value?.phone_number,
      feedback: this.form.value?.feedback,
      place_of_employment: this.form.value?.place_of_employment,
      salary: this.form.value?.salary,
      job_position: this.form.value?.job_position,
      candidatetechnology_set: this.technologiesToPost,
    }
    this.candidatesService.postCandidate(this.formToPost).subscribe(post => {
      console.log(post)
    })
    this.resetAll()
  }

  resetAll() {
    this.form.reset(
        {f_i_o: '',
          phone_number: '',
          place_of_employment: '',
          salary: '',
          job_position: '',
          description: '',
          feedback:'',
          birth_date: ''
        }
    )
    this.form.markAsUntouched()
    this.technology = this.tempTechnologies
  }

  setLevel(level: number | any, techId: number) {
    this.hasInArray = false
    this.technology.map(lvl => {
      if (lvl.id === techId) {
        if (lvl.knowledge_level === level) {
          lvl.knowledge_level = level - 1
        } else {
          lvl.knowledge_level = level
        }
        this.technologiesToPost.map(reset => {
          if (reset.technology === techId) {
            if (lvl.knowledge_level != null) {
              reset.knowledge_level = lvl.knowledge_level
              this.hasInArray = true
            }
          }
        })
      }
    })
    if(!this.hasInArray){
      this.technologiesToPost.push({knowledge_level: level, technology: techId})
    }
    this.technologiesToPost = this.technologiesToPost.filter(deleteName => deleteName.knowledge_level != 0)
  }

  getLevel(tech: string): any{
    return this.technology.find(x => x.name === tech)?.knowledge_level
  }

  private fetchTechnologies() {
    this.candidatesService.getTechnologies()
        .subscribe(src => {

          this.technology = src.results
          this.technology.map(techLvl => techLvl.knowledge_level = 0)


          this.technology?.map(klvl => {
            this.candidatetechnology_set.addControl(klvl.name, new FormControl(0))
          })

        })
  }

}
