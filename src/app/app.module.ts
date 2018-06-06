import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.route';

import { AppComponent } from './app.component';
import { NavegationComponent } from './navegation/navegation.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotificationComponent } from './notification/notification.component';
import { ResumeComponent } from './resume/resume.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { SubjectComponent } from './subject/subject.component';
import { CreateSubjectComponent } from './subject/create-subject/create-subject.component';
import { EditSubjectComponent } from './subject/edit-subject/edit-subject.component';
import { PaymentComponent } from './payment/payment.component';
import { UserService } from './user/user.service';
import { PaymentService } from './payment/payment.service';
import { ResumeService } from './resume/resume.service';

@NgModule({
  declarations: [
    AppComponent,
    NavegationComponent,
    LoginComponent,
    NotificationComponent,
    PageNotFoundComponent,
    ResumeComponent,
    UserComponent,
    CreateUserComponent,
    EditUserComponent,
    SubjectComponent,
    CreateSubjectComponent,
    EditSubjectComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, 
  ],
  providers: [
    LoginService,
    ResumeService,
    UserService,
    PaymentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
