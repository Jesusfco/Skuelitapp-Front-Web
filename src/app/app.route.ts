import { Routes } from '@angular/router';
import { NavegationComponent } from './navegation/navegation.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    

    // { path: 'album/:id', component: AlbumComponent, 
    //     children: [
    //         { path: 'show/:id', component: PhotoViewComponent },
    //         { path: 'selected', component: SelectedPhotosComponent },
    //         { path: 'confirm', component: ConfirmSelectedComponent },

    //     ] 
    // },
    
    { path: '**', component:  PageNotFoundComponent },
];