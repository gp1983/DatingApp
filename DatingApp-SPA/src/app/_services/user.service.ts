import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.urlBase;
  public userImgUrl = new BehaviorSubject('');
  public decodedToken: any;
  constructor(private http: HttpClient) { }

  getUsers() {

    const httpHeaderToken = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    };

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token'));
    console.log(decodedToken);
    return this.http.get<User[]>(this.baseUrl + 'user', httpHeaderToken);
  }
  getUser(id: string) {
    const httpHeaderToken = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    };

    return this.http.get<User>(this.baseUrl + 'user' + '/' + id, httpHeaderToken);
  }

  // register(model: any) {
  //   return this.http.post(this.baseUrl + 'register', model);
  // }
  updateUser(id: number, user: User) {
    const token = localStorage.getItem('token');
    let httpHeaderToken = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    };

    return this.http.put(this.baseUrl + 'user' + '/' + id, user, httpHeaderToken);
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return !helper.isTokenExpired(token);
  }

  public deletePhoto(idUser: number, idPhoto: number) {
    const token = localStorage.getItem('token');
    let httpHeaderToken = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    };

    return this.http.delete(this.baseUrl + 'user' + '/' + idUser + '/photo/' + idPhoto, httpHeaderToken);
  }

  public setMain(idUser: number, idPhoto: number) {
    const token = localStorage.getItem('token');
    let httpHeaderToken = {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    };

    return this.http.put(this.baseUrl + 'user' + '/' + idUser + '/photo/' + idPhoto + '/setMain', null, httpHeaderToken);
  }
}
