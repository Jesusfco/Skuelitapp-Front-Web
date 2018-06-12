import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from '../../class/Subject';
import { SchoolLevel } from '../../class/SchoolLevel';
import { SubjectService } from '../subject.service';
import { Router } from '@angular/router';
import { cardPop, backgroundOpacity } from '../../animations';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class CreateSubjectComponent implements OnInit {

  public subject: Subject = new Subject();
  public levelOptions: Array<SchoolLevel> = [];

  public state = {
    background: 'initial',
    card: 'initial',
  };

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.closePop();
    }

  }
  constructor(private _http: SubjectService, private router: Router) {

    this.setLevelOptions();

   }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
      // document.getElementById('searchProductInput').focus();
    }, 5);
  }

  createSubject() {

    this.subject.restoreValidations();
    this.subject.validateName();
    if(!this.subject.validations.validate) return;

    this._http.storeSubject(this.subject).then(
      data => {

        let not = {
          title: "Materia Guardada",
          description: 'Datos cargados al servidor',
          status: 200
        };

        sessionStorage.setItem('request', JSON.stringify(not));
        sessionStorage.setItem('newSubject', JSON.stringify(data));
        this.closePop();

      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    );

  }

  closePop(){

    setTimeout(() => {
      this.router.navigate(['/materias']);
    }, 450);

    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  setLevelOptions() {
    this._http.getLevels().then(

      data => {
        
        for(let d of data) {

          if(d.active) {
            this.levelOptions.push(d);
          }

        }

        if(this.levelOptions[0] != undefined){
          this.subject.school_level_id = this.levelOptions[0].id;
        }
  


      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    );

  }

  

}
