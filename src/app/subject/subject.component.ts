import { Component, OnInit } from '@angular/core';
import { Subject } from '../class/Subject';
import { SubjectService } from './subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  search: String;
  public subjects: Array<Subject> = [];

  public newSubjectOberser: any;

  constructor(private _http: SubjectService) {
    this.setNewSubjectObserver();
    this.searchInput();
   }

  ngOnInit() {
  }

  searchInput() {

    this._http.getSubjects(this.search).then(

      data  => {

        this.subjects = [];
        
        for(let d of data ) {

          let subject: Subject = new Subject();
          subject.setData(d);
          this.subjects.push(subject);

        }

      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    );

  }

  setNewSubjectObserver() {
    this.newSubjectOberser = setInterval(() => this.newSubjectObserverLogic(), 1000);
  }

  newSubjectObserverLogic() {

    if(sessionStorage.getItem('newSubject') == undefined) return;

    let sub: Subject = new Subject();
    sub.setData(JSON.parse(sessionStorage.getItem('newSubject')));
    this.subjects.unshift(sub);
    sessionStorage.removeItem('newSubject');

  }

  delete(subject) {

    this._http.deleteSub(subject).then(

      data => {

        const i = this.subjects.indexOf(subject);
        this.subjects.splice(i, 1);

      }, error => {

        sessionStorage.setItem('request', JSON.stringify(error));

      }

    );

  }

}
