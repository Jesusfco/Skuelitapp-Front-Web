import { Component, OnInit } from '@angular/core';
import { PeriodService } from '../period.service';
import { Period } from '../../class/Period';
import { Router, ActivatedRoute } from '@angular/router';
import { FadeAnimation, SlideAnimation } from '../../animations';
import { PeriodType } from '../../class/PeriodType';
import { SchoolLevel } from '../../class/SchoolLevel';

@Component({
  selector: 'app-edit-period',
  templateUrl: './edit-period.component.html',
  styleUrls: ['./edit-period.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class EditPeriodComponent implements OnInit {

  public original: Period = new Period();
  public edit: Period = new Period();
  public periodTypes: Array<PeriodType> = [];
  public request: number = 0;
  public observerRef: any;
  public schoolLevels: Array<SchoolLevel> = [];
  public status = [];

  constructor(private _http: PeriodService,
    private router: Router,
    private actRou: ActivatedRoute) {

    this.observerRef = actRou.params.subscribe(params => {
      this.original.id = params['id'];
      this.getData();
    });

    this.setPeriodType();
    this.setSchoolLevel();

    this.status = this.edit.getStatusArrayOptions();

   }

  ngOnInit() {
  }

  getData() {

    this.request++;

    this._http.showPeriod(this.original.id).then(

      data => {

        this.original.setDataEdit(data);
        this.edit.setDataEdit(data);
        
      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then( () => this.request-- );

  }

  editPeriod(){

    if(!this.edit.validatePartialArray() || !this.edit.validateAll()) {
      console.log('validation');
      return;
    }

    this.request++;

    this._http.updatePeriod(this.edit).then(

      data => {
        sessionStorage.setItem('editedPeriod', JSON.stringify(data));

        let not = {
          title: 'Periodo Actualizado',
          description: 'Los datos han sido guardados en el servidor',
          status: 200
        };

        this._http.sendData({
          period: this.edit,
          action: 'UPDATE'
        });

        sessionStorage.setItem('request', JSON.stringify(not));

      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then( () => this.request-- );
    
  }

  editPartial(id) {
    
    for(let i = 0; i < this.edit.partialsArray.length; i++) {

      if(this.edit.partialsArray[i].id == id) {

        this.edit.partialsArray[i].edit = true;

      } else {

        this.edit.partialsArray[i].edit = false;

      }

    }

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

      }, 
      
      error => sessionStorage.setItem('request', error)

    ).then ( () => this.request-- );
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

      }, error => sessionStorage.setItem('request', JSON.stringify(error))
      

    ).then ( () => this.request-- );

  }
  
}
