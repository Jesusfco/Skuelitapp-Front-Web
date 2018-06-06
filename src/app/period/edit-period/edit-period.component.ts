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
        this.original = data;
        this.edit = data;
      }

    ).then(

      () => this.request = false

    ).catch(

      error => sessionStorage.setItem('request', JSON.stringify(error))

    );

  }

  editPeriod(){
    this.request = true;

    this._http.updatePeriod(this.edit).then(

      data => {
        // this.original = data;
        // this.edit = data;
      }

    ).then(

      () => this.request = false

    ).catch(

      error => sessionStorage.setItem('request', JSON.stringify(error))

    );
  }

}
