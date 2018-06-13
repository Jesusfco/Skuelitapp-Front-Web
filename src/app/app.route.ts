import { Routes } from '@angular/router';
import { NavegationComponent } from './navegation/navegation.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

import { ResumeComponent } from './resume/resume.component';

import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';

import { PeriodComponent } from './period/period.component';
import { CreatePeriodComponent } from './period/create-period/create-period.component';
import { EditPeriodComponent } from './period/edit-period/edit-period.component';

import { PaymentAdministrationComponent } from './payment-administration/payment-administration.component';
import { CreatePaymentTypeComponent } from './payment-administration/create-payment-type/create-payment-type.component';
import { EditPaymentComponent } from './payment-administration/edit-payment/edit-payment.component';
import { DatePaymentComponent } from './payment-administration/date-payment/date-payment.component';

import { GroupComponent } from './group/group.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { ShowGroupComponent } from './group/show-group/show-group.component';

import { SubjectComponent } from './subject/subject.component';
import { CreateSubjectComponent } from './subject/create-subject/create-subject.component';
import { EditSubjectComponent } from './subject/edit-subject/edit-subject.component';

export const routes: Routes = [
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'resume', component: ResumeComponent },
    {
        path: 'users',
        component: UserComponent,
        children: [
            {path: 'create', component: CreateUserComponent },
            {path: 'edit/:id', component: EditUserComponent },
        ]
    },

    {   
        path: 'periodos', component: PeriodComponent,
        children: [
            {   path: 'create', component: CreatePeriodComponent },
            {   path: 'edit/:id', component: EditPeriodComponent },
        ]
    },

    {
        path: 'administracion-de-pagos', component: PaymentAdministrationComponent,
        children: [
            {   path: 'date/:id', component: DatePaymentComponent },
            {   path: 'create', component: CreatePaymentTypeComponent },
            {   path: 'edit/:id', component: EditPaymentComponent },
        ]
    },

    {
        path: 'grupos', component: GroupComponent,
        children: [
            {   path: 'create', component: CreateGroupComponent },
            {   path: 'show/:id', component: ShowGroupComponent },
        ]
    }, 

    {
        path: 'materias', component: SubjectComponent ,
        children: [
            {   path: 'create', component: CreateSubjectComponent },
            {   path: 'show/:id', component: EditSubjectComponent },
        ]
    },

    
    { path: '**', component:  PageNotFoundComponent },

];