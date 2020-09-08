import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberDetailsComponent } from './member/member-details/member-details.component';
import { MemberDetailsResolver } from '../app/_resolver/member-details.resolver';
import { MemberListResolver } from '../app/_resolver/member-list.resolver';

import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { FormGuard } from './_guards/form.guard';
import { MemberEditComponent } from './member/member-edit/member-edit.component';

// const routes: Routes = []; // sets up routes constant where you define your routes

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },

  {
    path: 'member',
    component: MemberListComponent,
    canActivate: [AuthGuard],
    resolve: { users: MemberListResolver }
  },
  {
    path: 'member-details/:id',
    component: MemberDetailsComponent,
    canActivate: [AuthGuard],
    resolve: { user: MemberDetailsResolver }
  },
  {
    path: 'member-edit/:id',
    component: MemberEditComponent,
    canActivate: [AuthGuard],
    canDeactivate: [FormGuard],
    // resolve: { user: MemberDetailsResolver }
  },

  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
