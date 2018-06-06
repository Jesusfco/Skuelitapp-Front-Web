import { Component, OnInit } from '@angular/core';
import { PeriodService } from '../period.service';
import { Period } from '../../class/Period';
import { Router } from '@angular/router';
import { FadeAnimation, SlideAnimation } from '../../animations';

@Component({
  selector: 'app-create-period',
  templateUrl: './create-period.component.html',
  styleUrls: ['./create-period.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class CreatePeriodComponent implements OnInit {

  public period = new Period();
  public form: Number = 1;
  public request: Boolean = false;

  constructor(private _http: PeriodService, private router: Router) { }

  ngOnInit() {
  }

  closeWindow() { this.router.navigate(['/users']); }

  createPeriod() {

    if(this.period.validateAll()){
      this.form = 2;
      this.period.setArrayPartials();
    }
    
  }

  partialForm() {

    if(!this.period.validatePartialArray()) {
      
      return;
    }

    
    this.request = true;
    this._http.storePeriod(this.period).then(
      
      data => {

        let not = {
          title: 'Periodo Registrado',
          description: 'Los datos han sido guardados en el servidor',
          status: 200
        };

        sessionStorage.setItem('request', JSON.stringify(not));

      }

    ).then(
      () => this.request = false
    ).catch(
      error => sessionStorage.setItem('request', JSON.stringify(error))
    );

  }
  
}
