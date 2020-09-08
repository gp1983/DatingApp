import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  constructor(private _router: Router) { }

  @Input() user: User;

  ngOnInit(): void {

  }
  goToDetails() {
    // this._router.navigate()
    this._router.navigateByUrl('/member-details/' + this.user.id);
    console.log('merda');
  }
}
