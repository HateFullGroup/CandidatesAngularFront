import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TitleService} from "./shared/services/title.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  private rooter!: Router
  titleService!: TitleService

  date: Date = new Date()

  constructor(rooter: Router, title: TitleService) {
    this.rooter = rooter
    this.titleService = title
  }

  ngOnInit(): void {

  }
}
