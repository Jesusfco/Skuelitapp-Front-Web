import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';
import { Group } from '../../class/Group';
import { FadeAnimation, SlideAnimation } from '../../animations';
import { Subject } from '../../class/Subject';


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

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode === 27) {
      this.closeWindow();
    }
    
  }
  constructor(private _http: GroupService,
    private router: Router,
    private actRou: ActivatedRoute) {


      this.observerRef = actRou.params.subscribe(params => {
        this.group.id = params['id'];
        this.getGroupData();
        this.getSubjects();
      });

    }

  ngOnInit() {
  }


  closeWindow(){
    this.router.navigate(['/grupos']);    
  }

  getGroupData() {

    this.request++;

    this._http.showGroup(this.group).then(

      data => {
        
        this.group.setData(data);
        this.checkSubjectsSelected();

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

  selectSubject(subject) {

    this.group.pushSubject(subject.id);
    subject.select = !subject.select;
    
    this.request++;

    this._http.postSubjectsFromGroup(this.group).then(

      data => {
        
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

  }

}
