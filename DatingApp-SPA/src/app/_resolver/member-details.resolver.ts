import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class MemberDetailsResolver implements Resolve<Observable<User>> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    return this.userService.getUser(id);
    // return Observable.of('Hello Alligator!').delay(2000);
  }
}
