import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';



@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input("photos")
  photos: Photo[];

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  constructor(private authService: AuthService, private alertify: AlertifyService, private userService: UserService) {

    this.uploader = new FileUploader({
      url: environment.urlBase + 'user/' + this.authService.decodedToken.nameid + '/photo',
      authToken: 'bearer ' + localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      isHTML5: true
    });
    //  this.uploader.onAfterAddingAll = (file) => { file. = false; };
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(
      res => {
        this.response = res;

        this.photos.push(JSON.parse(res));
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  ngOnInit() {
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public deletePhoto(id: number) {
    this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(
      (next) => {
        this.photos.splice(this.photos.findIndex(x => x.id === id), 1);
        const photo = this.photos.find(x => x.id === id);
        if (photo == null) {
          this.userService.userImgUrl.next('');
        }
      },
      (error) => {
        console.log(error);
      });
  }
  public setMain(id: number) {
    this.userService.setMain(this.authService.decodedToken.nameid, id).subscribe(
      (next) => {
        const oldMainPhoto = this.photos.find(x => x.isMain);
        if (oldMainPhoto) {
          oldMainPhoto.isMain = false;
        }
        const photo = this.photos.find(x => x.id === id);
        photo.isMain = true;
        this.userService.userImgUrl.next(photo.url);
      },
      (error) => {
        console.log(error);
      });
  }
}


