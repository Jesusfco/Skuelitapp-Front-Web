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

  public newPeriodObserver: any;
  public editPeriodObserver: any;

  public parameters: any = {
    from: '',
    to: ''
  };

  constructor(private _http: PeriodService) { 
    this.getData();
    this.setPeriodType();
    this.setNewPeriodObserver();
    this.setEditPeriodObserver();
  }

  ngOnInit() {
    
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

  setNewPeriodObserver() {
    this.newPeriodObserver = setInterval(() => this.newPeriodObserverLogic(), 1000);
  }

  newPeriodObserverLogic(){
    if(sessionStorage.getItem('newPeriod') == undefined) return;

    let newPeriod = JSON.parse(sessionStorage.getItem('newPeriod'));
    this.periods.unshift(newPeriod);
    sessionStorage.removeItem('newPeriod');

  }

  setEditPeriodObserver() {
    this.editPeriodObserver = setInterval(() => this.editPeriodObserverLogic(), 1000);
  }

  editPeriodObserverLogic() {
    if(sessionStorage.getItem('editedPeriod') == undefined) return;

    let editerPeriod = JSON.parse(sessionStorage.getItem('editedPeriod'));

    for(let i = 0; i < this.periods.length; i++) {
      if(this.periods[i].id == editerPeriod.id) {
        this.periods[i] = editerPeriod;
        break;
      }
    }

    sessionStorage.removeItem('editedPeriod');

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
