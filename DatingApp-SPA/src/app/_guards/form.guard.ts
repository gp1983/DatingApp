import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MemberEditComponent } from '../member/member-edit/member-edit.component';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }



@Injectable({ providedIn: 'root' })
export class FormGuard implements CanDeactivate<MemberEditComponent> {

  canDeactivate(
    component: MemberEditComponent
  ): boolean {

    if (component.editForm.dirty) {
      return confirm('Warning: Do you want to discard all the changes ?');
    }

    return true;
  }
}
