import { Component, OnInit } from '@angular/core';
import {AppRoutingModule} from "../app-routing.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../shared/interfaces";
import {AuthService} from "../auth/services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  private auth!: AuthService
  form! : FormGroup
  private router!: Router

  constructor(auth: AuthService, router: Router) {
    this.auth = auth
    this.router = router
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      login: new FormControl('', [Validators.required]),
    })
  }

  submit() {
    // if (this.form.invalid) {
    //   return
    // }
    // this.router.navigate(['/home'])
    const user: User = {
      username: this.form.value?.login,
      password: this.form.value?.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/home'])
    })

  }
}
