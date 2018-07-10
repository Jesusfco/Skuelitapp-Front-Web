import { Component, OnInit } from '@angular/core';
import { Period } from '../class/Period';
import { PeriodService } from './period.service';
import { PeriodType } from '../class/PeriodType';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {
  
  public periods: Array<Period> = [];
  public request: Boolean = false;
  public periodsTypes: Array<PeriodType> = [];

  

  public outletOutput: any;

  public parameters: any = {
    from: '',
    to: ''
  };

  constructor(private _http: PeriodService) { 
    this.getData();
    this.setPeriodType();

    this.outletOutput = this._http.getData().subscribe(x => {
      
      if (x.action == 'DELETE') {

        this.splicePeriod(x.period);

      } else if (x.action == 'UPDATE') {

        this.refreshPeriod(x.period);

      } else if (x.action == 'NEW') {

        this.addNewPeriod(x.period);
      }
      
    });

  }

  ngOnInit() { }

  splicePeriod(period) {
        
    for(let i = 0; i < this.periods.length; i++) {

      if(this.periods[i].id == period.id) {

        this.periods.splice(i, 1);
        break;

      }

    }

  }

  refreshPeriod(period) {

    for(let i = 0; i < this.periods.length; i++) {

      if(this.periods[i].id == period.id) {

        this.periods[i].setDataEdit(period);
        break;

      }

    }

  }

  addNewPeriod(period){

    let p = new Period();
    p.setDataEdit(period);
    this.periods.unshift(p);

  }

  getData() {

    this.request = true;

    this._http.getPeriods(this.parameters).then(
      
      data => {

        this.periods = [];

        for(let d of data ) {

          let x: Period = new Period();
          x.setDataEdit(d);
          this.periods.push(x);

        }
        
        this.setPeriodsTypeView();

      }

    ).then(

      () => this.request = false

    ).catch(

      error => sessionStorage.setItem('request', error)

    );

  }

  setPeriodType() {
    this._http.getPeriodType().then(
      
      data => {

        this.periodsTypes = [];

        for(let d of data ){

          let x: PeriodType = new PeriodType();
          x.setData(d);
          this.periodsTypes.push(x);
          
        }

        this.setPeriodsTypeView();

      }, 
      
      error => sessionStorage.setItem('request', error)

    ).then ( () => this.request = false );
  }


  setPeriodsTypeView() {

    for(let i = 0; i < this.periods.length; i++) {

      for(let type of this.periodsTypes) {

        if(this.periods[i].period_type_id == type.id) {

          this.periods[i].period_type_view = type.name;
          break;

        }

      }

    }

  }

}
