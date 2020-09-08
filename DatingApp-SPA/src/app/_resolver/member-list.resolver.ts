import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';


@Injectable()
export class MemberListResolver implements Resolve<Observable<User[]>> {
  constructor(private userService: UserService, private alertify: AlertifyService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    return this.userService.getUsers().pipe(
      catchError(error => {
        this.alertify.error(error);
        this.router.navigate(['/home']);
        return of(null);
      })
    );
    // return Observable.of('Hello Alligator!').delay(2000);
  }
}
