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
import { PaymentAdministrationComponent } from './payment-administration/payment-administration.component';
import { UserService } from './user/user.service';
import { PaymentService } from './payment-administration/payment.service';
import { ResumeService } from './resume/resume.service';
import { PeriodComponent } from './period/period.component';
import { CreatePeriodComponent } from './period/create-period/create-period.component';
import { PeriodService } from './period/period.service';
import { EditPeriodComponent } from './period/edit-period/edit-period.component';
import { CreatePaymentTypeComponent } from './payment-administration/create-payment-type/create-payment-type.component';
import { EditPaymentComponent } from './payment-administration/edit-payment/edit-payment.component';
import { DatePaymentComponent } from './payment-administration/date-payment/date-payment.component';
import { GroupComponent } from './group/group.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { ShowGroupComponent } from './group/show-group/show-group.component';
import { GroupService } from './group/group.service';

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
    PaymentAdministrationComponent,
    PeriodComponent,
    CreatePeriodComponent,
    EditPeriodComponent,
    CreatePaymentTypeComponent,
    EditPaymentComponent,
    DatePaymentComponent,
    GroupComponent,
    CreateGroupComponent,
    ShowGroupComponent
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
    GroupService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
