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
import { DeletePeriodComponent } from './period/delete-period/delete-period.component';

import { PaymentAdministrationComponent } from './payment-administration/payment-administration.component';
import { CreatePaymentTypeComponent } from './payment-administration/create-payment-type/create-payment-type.component';
import { EditPaymentComponent } from './payment-administration/edit-payment/edit-payment.component';
import { DatePaymentComponent } from './payment-administration/date-payment/date-payment.component';

import { GroupComponent } from './group/group.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { ShowGroupComponent } from './group/show-group/show-group.component';
import { DeleteGroupComponent } from './group/delete-group/delete-group.component';

import { SubjectComponent } from './subject/subject.component';
import { CreateSubjectComponent } from './subject/create-subject/create-subject.component';
import { EditSubjectComponent } from './subject/edit-subject/edit-subject.component';
import { ScheduleSubjectComponent } from './group/schedule-subject/schedule-subject.component';

import { PermissionComponent } from './permission/permission.component';
import { ShowPermissionComponent } from './permission/show-permission/show-permission.component';

import { TeachersScheduleComponent } from './teachers/teachers-schedule/teachers-schedule.component';
import { TeachersQualificationsComponent } from './teachers/teachers-qualifications/teachers-qualifications.component';

import { StudentsScheduleComponent } from './students/students-schedule/students-schedule.component';
import { StudentsQualificationsComponent } from './students/students-qualifications/students-qualifications.component';
import { ChatComponent } from './chat/chat.component';


import { ParentsSchedulesComponent } from './parents/parents-schedules/parents-schedules.component';
import { ParentsQualificationsComponent } from './parents/parents-qualifications/parents-qualifications.component';
import { ParentPermissionComponent } from './parents/parent-permission/parent-permission.component';
import { ParentCreatePermissionComponent } from './parents/parent-permission/parent-create-permission/parent-create-permission.component';
import { ParentShowPermissionComponent } from './parents/parent-permission/parent-show-permission/parent-show-permission.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ShowReceiptComponent } from './receipt/show-receipt/show-receipt.component';
import { DeleteReceiptComponent } from './receipt/delete-receipt/delete-receipt.component';
import { CreateReceiptComponent } from './receipt/create-receipt/create-receipt.component';


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
            {   path: 'delete/:id', component: DeletePeriodComponent }
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
            {   path: 'admin/:id', component: CreateGroupComponent },
            {   path: 'delete/:id', component: DeleteGroupComponent },
            {   path: 'show/:id', component: ShowGroupComponent,
                children: [
                    { path: 'horarios', component: ScheduleSubjectComponent }
                ]
            },
        ]
    }, 

    {
        path: 'materias', component: SubjectComponent ,
        children: [
            {   path: 'create', component: CreateSubjectComponent },
            {   path: 'show/:id', component: EditSubjectComponent },
        ]
    }, 

    { path: 'permisos', component:  PermissionComponent,
        children: [
            { path: 'ver/:id', component: ShowPermissionComponent },
        ]
    },

    { path: 'recibos', component:  ReceiptComponent,
        children: [
            { path: 'ver/:id', component: ShowReceiptComponent },
            { path: 'delete/:id', component: DeleteReceiptComponent },
            { path: 'create', component: CreateReceiptComponent },
        ]
    },
    //CHAT TODOS 
    { path: 'chat', component: ChatComponent },

    // ALUMNOS STUDENTS
    { path: 'horario-alumno', component:  StudentsScheduleComponent },
    { path: 'calificaciones-alumno', component:  StudentsQualificationsComponent },
    

    // ALUMNOS STUDENTS
    { path: 'horario-tutores', component:  ParentsSchedulesComponent },
    { path: 'calificaciones-tutores', component:  ParentsQualificationsComponent },
    { path: 'solicitud-permiso-tutores', component:  ParentPermissionComponent,
        children: [
            { path: 'crear', component: ParentCreatePermissionComponent },
            { path: 'edit/:id', component: ParentShowPermissionComponent },
        ]
    },

    // DOCENTES MAESTROS TEACHERS
    { path: 'horario-docente', component:  TeachersScheduleComponent },
    { path: 'calificaciones-docente', component:  TeachersQualificationsComponent },
    
    { path: '**', component:  PageNotFoundComponent },

];