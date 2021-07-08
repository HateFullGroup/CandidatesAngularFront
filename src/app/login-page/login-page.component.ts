import { Component, OnInit } from '@angular/core';
import {AppRoutingModule} from "../app-routing.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../shared/interfaces";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  private auth!: AppRoutingModule
  form! : FormGroup
  private router!: Router

  constructor(auth: AppRoutingModule, router: Router) {
    this.auth = auth
    this.router = router
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      login: new FormControl('', [Validators.required]),
    })
  }

  submit() {
    this.router.navigate(['/home'])
    const user: User = {
      login: this.form.value?.login,
      password: this.form.value?.password
    }


  }
}
