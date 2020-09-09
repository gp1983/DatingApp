import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  imageUrl: string;
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    public userService: UserService
  ) {
    this.userService.userImgUrl.subscribe(
      x => {
        this.imageUrl = x;
      }
    );
  }

  ngOnInit(): void {

  }
  login() {

    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Logged in succesfully!');


      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/member']);
      }
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.router.navigate(['/home']).then(x => {
      if (x) {
        localStorage.removeItem('token');
        this.alertify.message('logged out');
      }
    }
    );
  }
}
