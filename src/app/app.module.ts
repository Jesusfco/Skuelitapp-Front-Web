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

@NgModule({
  declarations: [
    AppComponent,
    NavegationComponent,
    LoginComponent,
    NotificationComponent,
    PageNotFoundComponent
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
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
