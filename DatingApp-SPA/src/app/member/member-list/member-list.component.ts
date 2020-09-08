import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe((next) => {
      this.users = next.users;
    }
    );
  }

  loadUser() {
    this.userService.getUsers().subscribe((next) => {

      this.users = next;
    },
      (error) => {
        console.log(error);
      },
      () => {

      });

  }
}
