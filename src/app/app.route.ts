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
        // {path: 'edit/:id', component: EditUserComponent },
        ]
    },

    // { path: 'album/:id', component: AlbumComponent, 
    //     children: [
    //         { path: 'show/:id', component: PhotoViewComponent },
    //         { path: 'selected', component: SelectedPhotosComponent },
    //         { path: 'confirm', component: ConfirmSelectedComponent },

    //     ] 
    // },
    
    { path: '**', component:  PageNotFoundComponent },
];