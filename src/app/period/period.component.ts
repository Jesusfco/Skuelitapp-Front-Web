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
  public editPeriodObserver: any;

  public parameters: any = {
    from: '',
    to: ''
  };

  constructor(private _http: PeriodService) { 
    this.getData();
    this.setNewPeriodObserver();
    this.setEditPeriodObserver();
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


}
