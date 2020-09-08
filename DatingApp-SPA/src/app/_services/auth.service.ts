import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  public decodedToken: any;
  constructor(private http: HttpClient, private userService: UserService) { }
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.removeItem('token');
          localStorage.setItem('token', user.token);
          const helper = new JwtHelperService();
          this.decodedToken = helper.decodeToken(user.token);
          this.userService.userImgUrl.next(this.decodedToken.photoUrl);
        }
      })
    );
  }
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return !helper.isTokenExpired(token);
  }
}
