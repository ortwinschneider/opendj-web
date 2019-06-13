import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData
  ) { }

  onLogin() {
    this.router.navigateByUrl('/home');
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  ngOnInit() {
  }

}
