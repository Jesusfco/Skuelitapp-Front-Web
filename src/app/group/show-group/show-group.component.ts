import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';
import { Group } from '../../class/Group';
import { FadeAnimation, SlideAnimation } from '../../animations';
import { Subject } from '../../class/Subject';
import { User } from '../../class/User';


@Component({
  selector: 'app-show-group',
  templateUrl: './show-group.component.html',
  styleUrls: ['./show-group.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class ShowGroupComponent implements OnInit {

  public observerRef: any;
  public group: Group = new Group;
  public subjects: Array<Subject> = [];
  public request: number = 0;
  public posibleStudents: Array<User> = [];

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode === 27) {
      // this.closeWindow();
    }
    
  }
  constructor(private _http: GroupService,
    private router: Router,
    private actRou: ActivatedRoute) {


      this.observerRef = actRou.params.subscribe(params => {
        this.group.id = params['id'];
        this.getGroupData();
        this.getSubjects();
        this.setPosibleStudents();
      });

    }

  ngOnInit() {
  }

  ngOnDestroy() {
    sessionStorage.removeItem('group');
    sessionStorage.removeItem('subjectFromGroup');
  }


  closeWindow(){
    this.router.navigate(['/grupos']);    
  }

  getGroupData() {

    this.request++;

    this._http.showGroup(this.group).then(

      data => {
        
        this.group.setData(data.group);
        this.group.setStudentsFromData(data.students);
        this.checkSubjectsSelected();

        sessionStorage.setItem('group', JSON.stringify(this.group));

      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then(
      () => this.request--
    );

  }

  getSubjects() {

    this.request++;

    this._http.getSubjectsFromGroup(this.group).then(

      data => {

        this.subjects = [];

        for(let d of data) {

          let x: Subject = new Subject();
          x.setData(d);
          this.subjects.push(x);

        }

        this.checkSubjectsSelected();

      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then(
      () => this.request--
    );
  }

  setPosibleStudents() {

    this.request++;
    this._http.getPosibleStudents(this.group).then(
      data => {

        this.posibleStudents = [];

        for(const d of data) {
          let x: User = new User();
          x.setData(d);
          this.posibleStudents.push(x);
        }

      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then(
      () => this.request--
    );
    
  }

  selectSubject(subject) {

    this.group.pushSubject(subject.id);
    subject.select = !subject.select;
    
    this.request++;

    this._http.postSubjectsFromGroup(this.group).then(

      data => {
        sessionStorage.setItem('subjectFromGroup', JSON.stringify(this.subjects));
      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then(
      () => this.request--
    );

  }

  checkSubjectsSelected() {

    for(let i = 0; i < this.subjects.length; i++) {

      for(let d of this.group.subjects_id_array) {
        if(this.subjects[i].id == d) {
          this.subjects[i].select = true;
        }
      }
      
    }

    sessionStorage.setItem('subjectFromGroup', JSON.stringify(this.subjects));

  }

  removeStudent(user) {

    if(this.request > 0) return;

    let copy = JSON.parse(JSON.stringify(user));
    copy.group_id = null;
    this.posibleStudents.push(copy);
    this.group.spliceStudent(user);

    setTimeout(() => this.syncGroupAndStudents(copy), 100);

  }

  addStudent(user) {

    if(this.request > 0) return;

    let copy = JSON.parse(JSON.stringify(user));
    copy.group_id = this.group.id;
    const i = this.posibleStudents.indexOf(user);
    this.group.pushStudent(user);
    this.posibleStudents.splice(i, 1);

    setTimeout(() => this.syncGroupAndStudents(copy), 100);

  }

  syncGroupAndStudents(copy) {
    this.request++;
    this._http.syncUserGroupId({user: copy, group: this.group}).then(
      data => {},
      error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then(
      () => this.request--
    );
  }

}
