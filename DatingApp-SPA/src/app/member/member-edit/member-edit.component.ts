import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  id: number;
  @ViewChild('editForm')
  editForm: NgForm;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.preventDefault();
      $event.returnValue = false;
    }
  }


  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private alertify: AlertifyService) { }



  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(this.id.toString()).subscribe(

      next => {
        this.user = next;
        this.userService.userImgUrl.subscribe(
          next => this.photoUrl = next
        );
        this.userService.userImgUrl.next(this.user.photoUrl);

      });

    // this.activatedRoute.data.subscribe((merda) => {
    //   console.log('merda.user');

    //   console.log(merda.user);
    //   this.user = merda.user;
    // },
    //   (error) => {
    //     console.log(error);
    //     this.alertify.error(error);
    //   },
    //   () => {
    //   });

  }

  save() {
    this.userService.updateUser(this.id, this.user).subscribe(
      (next) => {
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.user);
      }
      ,
      (error) => console.log(error)
    );
  }
}