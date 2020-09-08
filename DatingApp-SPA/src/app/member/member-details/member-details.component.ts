import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { identity } from 'rxjs';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';

import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})

export class MemberDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private alertify: AlertifyService) { }
  id: number;
  user: User;
  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.params['id']);
    const id = this.activatedRoute.snapshot.params['id'];

    this.activatedRoute.data.subscribe((merda) => {
      console.log('merda.user');

      console.log(merda.user);
      this.user = merda.user;
    },
      (error) => {
        console.log(error);
        this.alertify.error(error);
      },
      () => {
      });


    // const user = this.userService.getUser(id).subscribe((next) => {
    //   console.log(next);
    //   this.user = next;
    // },
    //   (error) => {
    //     console.log(error);
    //     this.alertify.error(error);
    //   },
    //   () => {
    //   });

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.GetImages();
    // this.activatedRoute.params.subscribe(params => {
    //   this.id = +params['id']; // (+) converts string 'id' to a number
    //   this.userService.getUser(id).subscribe((next) => {
    //     console.log(next);
    //     this.user = next;
    //   },
    //     (error) => {
    //       console.log(error);
    //       this.alertify.error(error);
    //     },
    //     () => {
    //     });


    // });
  }
  GetImages() {
    const images = [];
    for (const photo of this.user.photos) {
      images.push({
        small: photo.url, medium: photo.url, big: photo.url
      });
    }
    this.galleryImages = images;
    console.log(images);
  }

}
