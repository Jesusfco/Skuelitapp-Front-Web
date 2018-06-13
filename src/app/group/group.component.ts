import { Component, OnInit } from '@angular/core';
import { Group } from '../class/Group';
import { GroupService } from './group.service';
import { Period } from '../class/Period';
import { SchoolLevel } from '../class/SchoolLevel';
import { PeriodType } from '../class/PeriodType';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  public groups: Array<Group> = [];
  public periodTypes: Array<PeriodType> = [];
  public request: number = 0;
  public periods: Array<Period> = [];
  public levels: Array<SchoolLevel> = [];
  public search: any = {
    period_id: null,
    level: '',
  };

  public periodObserver: any;

  constructor(private _http: GroupService) { 

    this.setLevels();
    this.setPeriods();
    this.setPeriodType();
    this.setPeriodObserver();
  }

  ngOnInit() {
  }

  setLevels(){

    this.request++;

    this._http.getLevels().then(
      data => {

        for(let d of data) {
          let x: SchoolLevel = new SchoolLevel();
          x.setData(d);
          this.levels.push(x);
        }

        sessionStorage.setItem('schoolLevels', JSON.stringify(this.levels));

      }, error => sessionStorage.setItem('request', error)

    ).then(
      () => this.request--
    );
    
  }

  setPeriods() {

    this.request++;

    this._http.getPeriods().then(
      
      data => {

        this.periods = [];

          for(let x of data) {

            let y: Period = new Period();
            y.setDataEdit(x);
            this.periods.push(y);

          }

          if(this.periods[0] != undefined) {
            this.search.period_id = this.periods[0].id;
          }

            
          sessionStorage.setItem('periods', JSON.stringify(this.periods));
      },

      error => sessionStorage.setItem('request', error)

    ).then(
      () => this.request --
    );
    
  }

  changePeriod() {
    sessionStorage.setItem('periodSelect', JSON.stringify(this.search.period_id));
  }

  searchGroup() {
    this.request++;

    this._http.getGroups({id: this.search.period_id}).then(
      data => {

        this.groups = [];

          for(let x of data) {

            const y: Group = new Group();
            y.setData(x);
            this.groups.push(y);

          }

          this.setViewOfTypes();

          sessionStorage.setItem('groups', JSON.stringify(this.groups));
          this.changePeriod();

      },

      error => sessionStorage.setItem('request', error)

    ).then(
      () => this.request --
    );
  }

  setPeriodObserver() {
    this.periodObserver = setInterval(() => this.periodObserverLogic(), 1000);
  }

  periodObserverLogic() {
    
    if(this.periods.length === 0) return;

    this.searchGroup();
    clearInterval(this.periodObserver);
  }

  setPeriodType() {
    
    this.request++;

    this._http.getPeriodType().then(
      
      data => {

        this.periodTypes = [];

        for(let d of data ){
        
          let x: PeriodType = new PeriodType();
          x.setData(d);
          this.periodTypes.push(x);

        }

        this.setViewOfTypes();

      }, 
      
      error => sessionStorage.setItem('request', error)

    ).then ( () => this.request-- );
  }

  setViewOfTypes() {

    for(let i = 0; i < this.periods.length; i++) {

      this.periods[i].setPeriodTypeView(this.periodTypes);

    }

  }

}
