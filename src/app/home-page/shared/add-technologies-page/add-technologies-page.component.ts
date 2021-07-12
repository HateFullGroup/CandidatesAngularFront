import {Component, OnInit} from '@angular/core';
import {CandidatesService} from "../services/candidates.service";
import {getTechnologies} from "../../../shared/interfaces";
import {TitleService} from "../services/title.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-add-technologies-page',
  templateUrl: './add-technologies-page.component.html',
  styleUrls: ['./add-technologies-page.component.css']
})
export class AddTechnologiesPageComponent implements OnInit{

  private all!: CandidatesService
  private router!: ActivatedRoute
  routerToNavigate!: Router

  technologies!: getTechnologies[]
  title!: TitleService

  isSubmited = false
  inBase = false
  edition = false
  completedAdd = false
  completedEdit = false
  disableBtn = false
  inputForAdd: string = ''

  editById: number = -1
  editByName: string | null = ''

  constructor(all: CandidatesService, title: TitleService, router: ActivatedRoute, routerToNavigate: Router) {
    this.router = router
    this.all = all
    this.title = title
    this.routerToNavigate = routerToNavigate
  }


  ngOnInit(): void {
    this.fetchTechnologies()
    this.router.queryParams.subscribe((params: Params) => {
      if(params.id_tech && params.name_tech){
        this.editById = params.id_tech
        this.editByName = params.name_tech
        this.inputForAdd = params.name_tech
        this.edition = true
      } else {
        this.editById = -1
        this.editByName = ''
        this.edition = false
      }
      if(this.editById != -1) {
        setTimeout(() => {
          this.title.setTitle('Редактирование технологий')
        }, 10)

      } else {
        setTimeout(() => {
          this.title.setTitle('Добавление технологий')
        }, 10)
      }
    })
  }

  onSubmit() {
    this.isSubmited = true
    this.inBase = false
    this.fetchTechnologies()
    this.technologies.map(tech => {
      if(tech.name.toLowerCase() === this.inputForAdd.toLowerCase()){
        this.inBase = true
        return
      }
      this.isSubmited = false
    })
    if(!this.inBase){
      // this.newTechnology.name = this.inputForAdd
      this.all.postTechnology({name: this.inputForAdd}).subscribe(post => {
        console.log(post)
        this.completedAdd = true
      })
    }
  }

  onEdit() {
    this.isSubmited = true
    this.inBase = false
    this.fetchTechnologies()
    this.technologies.map(tech => {
      if(tech.name.toLowerCase() === this.inputForAdd.toLowerCase()){
        this.inBase = true
        return
      }
      this.isSubmited = false
    })
    if(!this.inBase){
      this.all.putTechnology({name: this.inputForAdd}, this.editById).subscribe(put => {
        console.log(put)
        this.completedEdit = true
      })
    }
  }

  onInput(event: any) {
    if(!this.isSubmited){
      this.inputForAdd = event.target.value
    }
  }

  onDelete() {
    this.all.deleteTechnology(this.editById).subscribe(() => {
      this.routerToNavigate.navigate(['home', 'technologies'], {queryParams: {complete: true, deletedTechName: this.editByName}})
    })
  }

  fetchTechnologies() {
    this.all.getTechnologies().subscribe(src=> {
      this.technologies = src.results
    })
  }


}
