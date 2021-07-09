import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TitleService} from "./shared/services/title.service";
import {AuthService} from "../auth/services/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  auth!: AuthService
  private rooter!: Router
  titleService!: TitleService

  date: Date = new Date()

  constructor(auth: AuthService, rooter: Router, title: TitleService) {
    this.rooter = rooter
    this.titleService = title
    this.auth = auth
  }

  ngOnInit(): void {

  }

}
