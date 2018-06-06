import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.route';

// import {
  // MatAutocompleteModule,
  // MatButtonModule,
  // MatButtonToggleModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatChipsModule,  
  // MatDatepickerModule,
  // MatDialogModule,
  // MatExpansionModule,
  // MatGridListModule,
  // MatIconModule,
  // MatInputModule,
  // MatListModule,
  // MatMenuModule,
  // MatNativeDateModule,
  // MatPaginatorModule,
  // MatProgressBarModule,
  // MatProgressSpinnerModule,
  // MatRadioModule,
  // MatRippleModule,
  // MatSelectModule,
  // MatSidenavModule,
  // MatSliderModule,
  // MatSlideToggleModule,
  // MatSnackBarModule,
  // MatSortModule,
  // MatTableModule,
  // MatTabsModule,
  // MatToolbarModule,
  // MatTooltipModule,
// } from '@angular/material';




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
import { PeriodComponent } from './period/period.component';
import { CreatePeriodComponent } from './period/create-period/create-period.component';
import { PeriodService } from './period/period.service';

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
    PaymentComponent,
    PeriodComponent,
    CreatePeriodComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, 

    
    // MatAutocompleteModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatPaginatorModule,
    // MatIconModule,

    // MatDatepickerModule,
    // MatDialogModule,
    // MatExpansionModule,
    // MatGridListModule,
    
    // MatInputModule,
    // MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
  ],
  providers: [
    LoginService,
    ResumeService,
    UserService,
    PaymentService,
    PeriodService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
