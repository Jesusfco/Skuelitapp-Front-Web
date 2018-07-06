import { Component, OnInit } from '@angular/core';
import { FadeAnimation, SlideAnimation } from '../../animations';
import { User } from '../../class/User';
import { Address } from '../../class/Address';
import { SchoolLevel } from '../../class/SchoolLevel';
import { Period } from '../../class/Period';
import { Group } from '../../class/Group';
import { PaymentType } from '../../class/PaymentType';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class EditUserComponent implements OnInit {

  public user: User = new User();
  public userOld: User = new User();
  public address: Address = new Address();
  public request: number = 0;
  public schoolLevels: Array<SchoolLevel> = [];

  public users: Array<User> = [];
  public periodSelected: Number;  
  public periods: Array<Period> = [];
  public groups: Array<Group> = [];
  public payments: Array<PaymentType> = [];

  public groupsOptions: Array<Group> = [];

  public timer: any = {
    email: 0,
  };

  public observerRef: any;

  constructor(private _http: UserService,
    private router: Router,
    private actRou: ActivatedRoute) {

      this.observerRef = actRou.params.subscribe(params => {
        this.user.id = params['id'];
        this.getUserData();
        
      });

      this.setSchoolLevel();
      

    }

  ngOnInit() {
  }

  getUserData() {
    this.request++;
    this._http.showUser(this.user).then(
      data => {
        this.user.setData(data);
        this.userOld.setData(data);

        if(this.user.grade > 0 && this.user.school_level_id > 0 && this.user.user_type == 1) {

          this.setGroupsPeriods();
          this.setGroupOptions();
          this.setPaymentTypes();

        }

        if(this.user.user_type == 2) {

          this.setChildrens();

        }

      },
      error => sessionStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.request--
    );
  }

  setGroupsPeriods() {

    
    // this.user.group_id = 0;
    

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

  uniqueEmail() {

    this._http.checkUniqueEmail(this.user.email).then(

      data => {

        if(data == false) {

          if(this.user.email != this.userOld.email) {

            this.user.validations.email = 2;
            this.user.validations.validate = false;

          } else {

            this.user.validations.email = -1;

          }
          
        } else { 
          
          this.user.validations.email = -1; 
        
        }

      },

      error => sessionStorage.setItem('request', JSON.stringify(error))
      
    );
  }

  updateUser() {

    if (!this.user.validationLogic()) { return; }

    this.request++;

    this._http.updateUser(this.user).then(

      data => {

        this.user.setData(data);
        this.userOld.setData(data);

        const not = {
          title: 'Usuario Actualizado',
          description: 'Datos de ' + this.user.name + ' cargados Correctamente',
          status: 200
        };

        sessionStorage.setItem('request', JSON.stringify(not));

      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then(

      () => this.request--

    );

  }

  setChildrens() {

    this.request++;
    
    this._http.getChildren({id: this.user.id}).then(

      data => {

        this.users = [];

        for(let d of data) {

          let us = new User();
          us.setData(d);
          this.users.push(us);

        }

      }

    ).then(

      () => this.request--

    );

  }

}
