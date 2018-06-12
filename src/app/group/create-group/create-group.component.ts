import { Component, OnInit } from '@angular/core';
import { SlideAnimation, FadeAnimation } from '../../animations';
import { GroupService } from '../group.service';
import { Router } from '@angular/router';
import { Period } from '../../class/Period';
import { Group } from '../../class/Group';
import { SchoolLevel } from '../../class/SchoolLevel';
import { SchoolLevelModality } from '../../class/SchoolLevelModality';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class CreateGroupComponent implements OnInit {

  public periods: Array<Period> = [];
  public groups: Array<Group> = [];
  public levels: Array<SchoolLevel> = [];
  public schoolLevelModalities: Array<SchoolLevelModality> = [];

  public request: number = 0;

  public periodObserver: any;
  public levelObserver: any;
  public parametersObserver: any;
  public groupObsever: any;

  public levelOptions: Array<SchoolLevel> = [];

  public information: any = {
    period_id: null,
    from: null,
    to: null,
    period_type_id: null,
  };

  public newGroup: Group = new Group();

  constructor(private _http: GroupService, private router: Router) {
    this.setLevelObserver();
    this.setParameterObserver();
    this.setPeriodObserver();
    this.setGroupObserver();

    this.setSchoolLevelModality();
  }

  ngOnInit() {
   
  }



  setPeriodObserver() {
    this.periodObserver = setInterval(() => this.periodLogicObserver(), 1100);
  }

  setLevelObserver() {
    this.levelObserver = setInterval(() => this.levelLogicObserver(), 1000);
  }

  setParameterObserver() {
    this.parametersObserver = setInterval(() => this.parameterLogicObserver(), 500);
  } 

  setGroupObserver() {
    this.groupObsever = setInterval(() => this.groupObserverLogic(), 1000);
  }

  periodLogicObserver() {
    
    if(sessionStorage.getItem('periods') == undefined) return;
    this.periods = JSON.parse(sessionStorage.getItem('periods'));    
    clearInterval(this.periodObserver);
    this.setInformation();
    this.setInformationPeriodTypeId();
  }

  levelLogicObserver() {
    
    if(sessionStorage.getItem('schoolLevels') == undefined) return;

    for(let level of JSON.parse(sessionStorage.getItem('schoolLevels'))) {
      if(level.active) {
        this.levels.push(level);
      }
    }
    this.setLevelOption();

    clearInterval(this.levelObserver);

  }

  parameterLogicObserver() {
    if(sessionStorage.getItem('periodSelect') == undefined) return;
    this.information.period_id = JSON.parse(sessionStorage.getItem('periodSelect'));
    clearInterval(this.parametersObserver);
  }
  
  groupObserverLogic() {
    
    if(sessionStorage.getItem('groups') == undefined) return;

    let data = JSON.parse(sessionStorage.getItem('groups'));

    for(let d of data) {
      let x: Group = new Group();
      x.setData(d);
      this.groups.push(x);
    }

    clearInterval(this.groupObsever);

  }

  setInformation() {
    for(let d of this.periods) {
      if(d.id == this.information.period_id) {
        this.information.from = d.from;
        this.information.to = d.to;
        break;
      }
    }
  }

  createAllGroups(){

    for(let level of this.levels){

      if(level.active) {

        if(level.id == 2) {

          for(let i = 0; i < 6; i++) {

            let group: Group = new Group();
            group.period_id = this.information.period_id;
            group.school_level_id = level.id;
            group.grade = i + 1;
            group.group = 1;

            for(let g of this.groups) {
              if(g.school_level_id == group.school_level_id && g.grade == group.grade) {
                group.group++;
              }
            }

            group.setGroupView();
            group.setLevelView();
            this.groups.push(group);

          }

        } else {

          for(let i = 0; i < 3; i++) {

            let group: Group = new Group();
            group.period_id = this.information.period_id;
            group.school_level_id = level.id;
            group.grade = i + 1;
            group.group = 1;

            for(let g of this.groups) {
              if(g.school_level_id == group.school_level_id && g.grade == group.grade) {
                group.group++;
              }
            }

            group.setGroupView();
            group.setLevelView();
            this.groups.push(group);

          }

        }

      }

    }

    this.sendGroupsData();

  }

  createFirstPreparatoriaPeriod() {

    for(let i = 0; i < 3; i++) {

      let group: Group = new Group();
      group.period_id = this.information.period_id;
      group.school_level_id = 4;
      group.grade = 1 + ( i * 2 ) ;
      group.group = 1;

      for(let g of this.groups) {
        if(g.school_level_id == group.school_level_id && g.grade == group.grade) {
          group.group++;
        }
      }

      group.setGroupView();
      group.setLevelView();
      this.groups.push(group);

    }

    this.sendGroupsData();

  }



  createSecondPreparatoriaPeriod() {

    for(let i = 0; i < 3; i++) {

      let group: Group = new Group();
      group.period_id = this.information.period_id;
      group.school_level_id = 4;
      group.grade = 2 + ( i * 2 ) ;
      group.group = 1;

      for(let g of this.groups) {
        if(g.school_level_id == group.school_level_id && g.grade == group.grade) {
          group.group++;
        }
      }

      group.setGroupView();
      group.setLevelView();
      this.groups.push(group);

    }

    this.sendGroupsData();

  }

  setLevelOption() {
    this.levelOptions = [];
    for(let d of this.levels) {
      if(d.active) {
        this.levelOptions.push(d);
      }
    }

    if(this.levelOptions[0] != undefined) {
      this.newGroup.school_level_id = this.levelOptions[0].id;
    }

  }

  setGroupNewGroup() {
    this.newGroup.group = 1;

    for(let group of this.groups){

      if(group.grade == this.newGroup.grade && group.school_level_id == this.newGroup.school_level_id) {

        this.newGroup.group++;
        
      }

    }

    this.newGroup.setGroupView();

  }

  storeSingleGroup() {
    this.newGroup.restoreValidation();
    this.newGroup.validateGrade();
    this.setGroupNewGroup();
    this.newGroup.setLevelView();
    
    if(!this.newGroup.validations.validate) return;

    this.groups.unshift(this.newGroup);

    this.newGroup = new Group();
    this.newGroup.school_level_id = this.levels[0].id;
    this.setGroupNewGroup();

  }

  setSchoolLevelModality() {

    this.request++;

    this._http.getSchoolLevelModalities().then(

      data => {
        
        this.schoolLevelModalities = [];

        for(let d of data) {

          let x: SchoolLevelModality = new SchoolLevelModality();
          x.setData(d);
          this.schoolLevelModalities.push(x);

        }
        
      }, 
      
      error => sessionStorage.setItem('request', error)

    ).then(
      () => this.request--
    );

  }

  setInformationPeriodTypeId() {

    for(let d of this.periods ){

      if(d.id == this.information.period_id){

        this.information.period_type_id = d.period_type_id;
        break;

      }

    }

    this.filterLevel();

  }

  filterLevel() {

    let levels: Array<SchoolLevel> = [];

    for(let i = 0; i < this.schoolLevelModalities.length; i++) {

      if(this.schoolLevelModalities[i].period_type_id == this.information.period_type_id) {

        for(let d of this.levels) {

          if(this.schoolLevelModalities[i].school_level_id == d.id) {

            levels.push(d);
            break;

          }

        }

      }

    }

    this.levels = levels;

    this.setLevelOption();

  }

  deleteGroup(group) {


    if(group.id == null) {

      const i = this.groups.indexOf(group);
      this.groups.splice(i, 1);
      return;

    }

    this.request++;

    this._http.deleteGroup(group).then(

      data => {

        const i = this.groups.indexOf(group);
        this.groups.splice(i, 1);

      }, error => {



      }
    ).then(
      () => this.request--
    );

    
  }

  sendGroupsData() {

    
    let groups = [];

    for(let g of this.groups) {

      if(g.id == null){
        groups.push(g);
      }
      
    }

    this.request ++;

    this._http.postGroups({groups: groups}).then(

      data => {

        for(let d of data) {

          for(let i = 0; i < this.groups.length; i++) {

            if(this.groups[i].grade == d.grade && this.groups[i].group == d.group && this.groups[i].school_level_id == d.school_level_id) {
              this.groups[i].setData(d);
              break;
            }

          }

        }


      }

      ,

      error => sessionStorage.setItem('request', error)

    ).then(
      () => this.request --
    );

  }

}
