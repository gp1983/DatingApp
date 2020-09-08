import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberCardComponent } from './member/member-card/member-card.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './routes.module';
import { UserService } from './_services/user.service';
import { JwtModule } from "@auth0/angular-jwt";
import { CommonModule } from '@angular/common';
import { MemberDetailsComponent } from './member/member-details/member-details.component'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberDetailsResolver } from './_resolver/member-details.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from 'src/app/member/member-edit/member-edit.component'
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { PhotoEditorComponent } from './member/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    PhotoEditorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       return localStorage.getItem('token');
    //     },
    //     allowedDomains: ['http://localhost:4200/', 'http://localhost:4200', 'http://localhost:4200', 'http://localhost:4200/member', 'localhost:4200'],
    //     // disallowedRoutes: ["http://example.com/examplebadroute/"],
    //   },
    // }),
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [AuthService, ErrorInterceptorProvider, AlertifyService, UserService, MemberDetailsResolver, MemberListResolver],
  bootstrap: [AppComponent],
})
export class AppModule { }
