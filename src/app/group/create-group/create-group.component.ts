import { Component, OnInit } from '@angular/core';
import { SlideAnimation, FadeAnimation } from '../../animations';
import { GroupService } from '../group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Period } from '../../class/Period';
import { Group } from '../../class/Group';



@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class CreateGroupComponent implements OnInit {

  public period: Period = new Period();
  public groups: Array<Group> = [];
  public request: number = 0;
  public newGroup: Group = new Group();
  public observerRef: any;

  constructor(private _http: GroupService, private router: Router, private actRou: ActivatedRoute) {
    

    

    this.observerRef = actRou.params.subscribe(params => {
      
      this.period.id = parseFloat(params['id']);
      this.setPeriod();
      this.setGroups();
      
    });
  }

  ngOnInit() {
   
  }

  createAllGroups(){

    if(this.period.school_level_id == 2) {

      for(let i = 0; i < 6; i++) {

        let group: Group = new Group();
        group.period_id = this.period.id;
        group.school_level_id = this.period.school_level_id;
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
        group.period_id = this.period.id;
        group.school_level_id = this.period.school_level_id;
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

    this.sendGroupsData();

  }

  createFirstPreparatoriaPeriod() {

    for(let i = 0; i < 3; i++) {

      let group: Group = new Group();
      group.period_id = this.period.id;
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
      group.period_id = this.period.id;
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
    this.newGroup.school_level_id = this.period.school_level_id;
    this.newGroup.setLevelView();
    this.setGroupNewGroup();

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

  setPeriod() {
    
    this.request++;
    this._http.showPeriod(this.period.id).then(
      data => {
        this.period.setDataEdit(data);
        this.newGroup.school_level_id = this.period.school_level_id;
        this.newGroup.setLevelView();
        
      },
      error => sessionStorage.setItem('request', error)

    ).then(
      () => this.request --
    );

  }

  setGroups() {
    this.request++;
    this._http.getGroups(this.period).then(
      data => {
        this.groups = [];
        for(let d of data) {
          let x: Group = new Group();
          x.setData(d);
          this.groups.push(x);
        }
      },
      error => sessionStorage.setItem('request', error)

    ).then(
      () => this.request --
    );
  }

}
