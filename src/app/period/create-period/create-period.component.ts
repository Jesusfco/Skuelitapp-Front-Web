import { Component, OnInit } from '@angular/core';
import { PeriodService } from '../period.service';
import { Period } from '../../class/Period';
import { Router } from '@angular/router';
import { FadeAnimation, SlideAnimation } from '../../animations';
import { PeriodType } from '../../class/PeriodType';

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
  public periodTypes: Array<PeriodType> = [];

  constructor(private _http: PeriodService, private router: Router) { 
    this.setPeriodType();
  }

  ngOnInit() {
  }

  closeWindow() { this.router.navigate(['../periodos']); }

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
        sessionStorage.setItem('newPeriod', JSON.stringify(data));

        this.closeWindow();
        
      },
      
      error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then( () => this.request = false );

  }

  setPeriodType() {
    this._http.getPeriodType().then(
      
      data => {

        this.periodTypes = [];

        for(let d of data ){

          if(d.active ){

            let x: PeriodType = new PeriodType();
            x.setData(d);
            this.periodTypes.push(x);

          } 

        }

      }, 
      
      error => sessionStorage.setItem('request', error)

    ).then ( () => this.request = false );
  }
  
}
