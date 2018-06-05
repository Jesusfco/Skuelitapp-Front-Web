import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { Router } from '@angular/router';
import { Url } from './url';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('loaderImg', [
      
      state('initial', style({
        transform: 'translate3d(0,80%,0) scale(.7)',        
        opacity: 0
      })),

      state('final' , style({
        transform: 'translate3d(0,0,0) scale(1)',       
        opacity: 1
      })),      

      transition('initial <=> final' , animate('1000ms ease-out')),
    ]),

    trigger('loader', [
      
      state('initial', style({        
        opacity: 1
      })),

      state('final' , style({
        display: 'none',       
        opacity: 0
      })),      

      transition('initial <=> final' , animate('500ms ease-out')),
    ])

  ]
})
export class AppComponent {
  public url: Url = new Url();
  
}
