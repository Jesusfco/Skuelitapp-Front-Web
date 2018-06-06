import { Component, OnInit } from '@angular/core';
import { Period } from '../class/Period';
import { PeriodService } from './period.service';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {
  
  public periods: Array<Period> = [];
  public request: Boolean = false;

  public newPeriodObserver: any;

  public parameters: any = {
    from: '',
    to: ''
  };

  constructor(private _http: PeriodService) { 
    this.getData();
    this.setNewPeriodObserver();
  }

  ngOnInit() {
  }


  getData() {

    this.request = true;

    this._http.getPeriods(this.parameters).then(
      
      data => {
        this.periods = data;
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

}
