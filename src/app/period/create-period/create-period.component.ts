import { Component, OnInit } from '@angular/core';
import { PeriodService } from '../period.service';
import { Period } from '../../class/Period';
import { Router } from '@angular/router';
import { FadeAnimation, SlideAnimation } from '../../animations';
import { PeriodType } from '../../class/PeriodType';
import { SchoolLevel } from '../../class/SchoolLevel';

@Component({
  selector: 'app-create-period',
  templateUrl: './create-period.component.html',
  styleUrls: ['./create-period.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class CreatePeriodComponent implements OnInit {

  public period = new Period();
  public form: Number = 1;
  public request: number = 0;
  public periodTypes: Array<PeriodType> = [];
  public schoolLevels: Array<SchoolLevel> = [];

  constructor(private _http: PeriodService, private router: Router) { 
    this.setPeriodType();
    this.setSchoolLevel();
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

    
    this.request++;
    this._http.storePeriod(this.period).then(
      
      data => {

        let not = {
          title: 'Periodo Registrado',
          description: 'Los datos han sido guardados en el servidor',
          status: 200
        };

        this._http.sendData({
          period: data,
          action: 'NEW'
        });

        sessionStorage.setItem('request', JSON.stringify(not));

        this.closeWindow();
        
      },
      
      error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then ( () => this.request-- );

  }

  setPeriodType() {

    this.request++;

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

      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then ( () => this.request-- );
  }
  

  setSchoolLevel() {

    this.request++;

    this._http.getSchoolLevels().then(

      data => {

        for(let d of data) {

          if(d.active) {
            this.schoolLevels.push(d);
          }

        }

      }, error => sessionStorage.setItem('request', JSON.stringify(error))
      

    ).then ( () => this.request-- );

  }

}
