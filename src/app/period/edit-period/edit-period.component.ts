import { Component, OnInit } from '@angular/core';
import { PeriodService } from '../period.service';
import { Period } from '../../class/Period';
import { Router, ActivatedRoute } from '@angular/router';
import { FadeAnimation, SlideAnimation } from '../../animations';

@Component({
  selector: 'app-edit-period',
  templateUrl: './edit-period.component.html',
  styleUrls: ['./edit-period.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class EditPeriodComponent implements OnInit {

  public original: Period = new Period();
  public edit: Period = new Period();
  public request: Boolean = false;
  public observerRef: any;

  constructor(private _http: PeriodService,
    private router: Router,
    private actRou: ActivatedRoute) {

    this.observerRef = actRou.params.subscribe(params => {
      this.original.id = params['id'];
      this.getData();
    });

   }

  ngOnInit() {
  }

  getData() {

    this.request = true;

    this._http.showPeriod(this.original.id).then(

      data => {
        this.original.setDataEdit(data);
        this.edit.setDataEdit(data);
      }

    ).then(

      () => this.request = false

    ).catch(

      error => sessionStorage.setItem('request', JSON.stringify(error))

    );

  }

  

  editPeriod(){

    if(!this.edit.validatePartialArray() || !this.edit.validateAll()) {
      console.log('validation');
      return;
    }

    this.request = true;

    this._http.updatePeriod(this.edit).then(

      data => {
        sessionStorage.setItem('editedPeriod', JSON.stringify(data));

        let not = {
          title: 'Periodo Actualizado',
          description: 'Los datos han sido guardados en el servidor',
          status: 200
        };

        sessionStorage.setItem('request', JSON.stringify(not));

      }

    ).then(

      () => this.request = false

    ).catch(

      error => sessionStorage.setItem('request', JSON.stringify(error))

    );
    
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
}
