import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private rooter!: Router

  date: Date = new Date()

  constructor(rooter: Router) {
    this.rooter = rooter
  }

  ngOnInit(): void {

  }

}
