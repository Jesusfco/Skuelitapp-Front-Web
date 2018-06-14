import { Component, OnInit } from '@angular/core';
import { FadeAnimation, SlideAnimation } from '../../animations';
import { GroupService } from '../group.service';
import { Group } from '../../class/Group';
import { Schedule } from '../../class/Schedule';
import { Subject } from '../../class/Subject';
import { User } from '../../class/User';

@Component({
  selector: 'app-schedule-subject',
  templateUrl: './schedule-subject.component.html',
  styleUrls: ['./schedule-subject.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class ScheduleSubjectComponent implements OnInit {

  public group: Group = new Group();
  public subjects: Array<Subject> = [];
  public schedules: Array<Schedule> = [];
  public newSchedule: Schedule = new Schedule();
  public teachers: Array<User> = [];

  public groupObserver;
  public subjectsObserver;

  public mode = 1;

  public timer: number = 0;

  public days = [
    {value: 1, view: 'LUNES'},
    {value: 2, view: 'MARTES'},
    {value: 3, view: 'MIERCOLES'},
    {value: 4, view: 'JUEVES'},
    {value: 5, view: 'VIERNES'},
    {value: 6, view: 'SABADO'},
    
  ];

  public search: any  = {
    name: '',
    patern_surname: '',
    matern_surname: '',
    page: 1,
    total: 0,
    lastPage: null
  };

  constructor(private _http: GroupService) { 
    this.setGroupObserver();
    this.setSubjectsObserver();
  }

  ngOnInit() {
  }

  setGroupObserver() {
    this.groupObserver = setInterval(() => this.groupObserverLogic(), 1000);
  }

  setSubjectsObserver() {
    this.subjectsObserver = setInterval(() => this.subjectsObserverLogic(), 1000);
  }

  groupObserverLogic() {
    if(sessionStorage.getItem('group') == undefined) return;

    let gr = JSON.parse(sessionStorage.getItem('group'));
    this.group.setData(gr);
    this.setSchedulesFromServer();
    clearInterval(this.groupObserver);
  }

  subjectsObserverLogic() {
    if(sessionStorage.getItem('subjectFromGroup') == undefined) return;

    let gr = JSON.parse(sessionStorage.getItem('subjectFromGroup'));

    for(let s of gr) {
      if(s.select) {
        let x = new Subject();
        x.setData(s);
        this.subjects.push(x);
      }
    }
  
    clearInterval(this.subjectsObserver);
  }

  setSchedulesFromServer() {
    this._http.getSchedules(this.group).then(
      data => {
        for(let d of data) {
          let x = new Schedule();
          x.setData(d);
          this.schedules.push(x);
        }
      }, error => sessionStorage.setItem('request', JSON.stringify(error))
    );
  }

  searchTimer(e) {
    if(e.keyCode == 13) {
      this.searchInput();
      return;
    }

    this.timer++;

    setTimeout(() => {
      this.timer--;
    }, 900);

    setTimeout(() => {
      if(this.timer == 0){
        if(this.search.name.length > 3 || this.search.patern_surname.length > 3 || this.search.matern_surname.length > 3) this.searchInput();
      }
    }, 950);

  }

  searchInput(){

    this._http.getTeachers(this.search).then(
      data => {
        this.teachers = [];
        for(let d of data) {
          const x: User = new User();
          x.setData(d);
          this.teachers.push(x);
        }
      },
      error => sessionStorage.setItem('request', JSON.stringify(error))
    );

  }

  selectTeacher(user) {
    this.newSchedule.teacher_id = user.id;
    this.newSchedule.teacher = user.name + ' '  + user.patern_surname + ' ' + user.matern_surname;

    this.teachers = [];
    this.search = {
      name: '',
      patern_surname: '',
      matern_surname: '',
      page: 1,
      total: 0,
      lastPage: null
    };

  }

}
