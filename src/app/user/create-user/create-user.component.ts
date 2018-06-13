import { Component, OnInit } from '@angular/core';
import { User } from '../../class/User';
import { Address } from '../../class/Address';
import { FadeAnimation, SlideAnimation } from '../../animations';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SchoolLevel } from '../../class/SchoolLevel';
import { Period } from '../../class/Period';
import { Group } from '../../class/Group';
import { PaymentType } from '../../class/PaymentType';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class CreateUserComponent implements OnInit {

  public user: User = new User();
  public address: Address = new Address();
  public request: number = 0;
  public schoolLevels: Array<SchoolLevel> = [];

  public student: User = new User();
  public parents: Array<User> = [];

  public periodSelected: Number;  
  public periods: Array<Period> = [];
  public groups: Array<Group> = [];
  public payments: Array<PaymentType> = [];

  public groupsOptions: Array<Group> = [];

  public timer: any = {
    email: 0,
  };

  constructor(private _http: UserService, private router: Router) {
    this.setSchoolLevel();
   }

  ngOnInit() {
  }

  createUser() {
    if(!this.user.validationLogic()) return;
      
    
    this.user.address = this.address;

    this.request++;

    this._http.storeUser(this.user).then(
      data => {

        const not = {
          title: 'Usuario Creado',
          description: 'Datos de ' + this.user.name + 'Cargados Correctamente',
          status: 200
        };

        sessionStorage.setItem('request', JSON.stringify(not));

        if(this.user.user_type == 1 || this.student.id != undefined) {
          
          if(this.student.id == undefined) {
            this.student.setData(data);  
          }
          
          this.user = new User();
          this.user.students_id = '<' + this.student.id + '>';
          this.user.user_type = 2;
          this.user.school_level_id = null;
          this.user.address_id = this.student.address_id;
        } else {
          this.user = new User();
          this.address = new Address();
        }


      },
      error => sessionStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.request--
    );
    
  }

  closeWindow(){
    this.router.navigate(['/users']);    
  }

  mailWriting() {
    this.user.lowerCaseEmail();
    this.uniqueEmailWriting();
  }

  uniqueEmailWriting(){
    this.timer.email++;

    setTimeout(() => {
      this.timer.email--;
    }, 900);

    setTimeout(() => {
      if(this.timer.email == 0){
        if(this.user.email.length > 7) this.uniqueEmail();
      }
    }, 950);

  }

  uniqueEmail(){
    this._http.checkUniqueEmail(this.user.email).then(
      data => {
        if(data == false){
          this.user.validations.email = 2;
          this.user.validations.validate = false;
        }  
        else { this.user.validations.email = -1; }
      },
      error => sessionStorage.setItem('request', JSON.stringify(error))
    );
  }


  setSchoolLevel() {

    this.request++;

    this._http.getSchoolLevels().then(

      data => {

        for(let d of data) {

          if(d.active) {
            this.schoolLevels.push(d);
          }

        }

        if(this.schoolLevels[0] != undefined) {
          this.user.school_level_id = this.schoolLevels[0].id;
        }

      }, error => sessionStorage.setItem('request', JSON.stringify(error))
      

    ).then ( () => this.request-- );

  }

  setGroupsPeriods() {

    
    this.user.group_id = 0;
    

    if(this.user.grade == null || this.user.school_level_id == null) return;

    this.request++;

    this._http.getGroups(this.user).then(

      data => {

        this.groups = [];
        this.periods = [];
        this.groupsOptions = [];

        for(let period of data.periods) {
          let x: Period = new Period();
          x.setDataEdit(period);
          this.periods.push(x);
        }

        for(let group of data.groups) {
          let x: Group = new Group();
          x.setData(group);
          this.groups.push(x);
        }

        if(this.periods[0] != undefined) {
          this.periodSelected = this.periods[0].id;
          this.setGroupOptions();
          this.setPaymentTypes();
        }
        
      }, error => sessionStorage.setItem('request', JSON.stringify(error))
      

    ).then ( () => this.request-- );
  }

  setGroupOptions() {

    this.groupsOptions = [];

    for(let g of this.groups) {

      if(g.period_id == this.periodSelected) {
        this.groupsOptions.push(g);
      }

    }

  }

  setPaymentTypes() {

    let parameters = {
      school_level_id: this.user.school_level_id,
      period_type_id: null,
    };

    for(let p of this.periods) {

      if(p.id == this.periodSelected) {

        parameters.period_type_id = p.period_type_id;
        break;

      }

    }

    if(parameters.period_type_id == null) return;

    this.request++;

    this._http.getPosiblePayment(parameters).then(

      data => {
        this.payments = [];
        for(let d of data) {
          const x: PaymentType = new PaymentType();
          x.setData(d);
          this.payments.push(x);
        }
      }, error => sessionStorage.setItem('request', JSON.stringify(error))
      

    ).then ( () => this.request-- );

  }

}
