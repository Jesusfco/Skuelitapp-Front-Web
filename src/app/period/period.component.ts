import { Component, OnInit } from '@angular/core';
import { Period } from '../class/Period';
import { PeriodService } from './period.service';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {
  
  public periods: Array<Period> = [];
  public request: Boolean = false;

  public parameters: any = {
    from: '',
    to: ''
  };

  constructor(private _http: PeriodService) { 
    this.getData();
  }

  ngOnInit() {
  }


  getData() {

    this.request = true;

    this._http.getPeriods(this.parameters).then(
      
      data => {
        this.periods = data;
      }

    ).then(

      () => this.request = false

    ).catch(

      error => sessionStorage.setItem('request', error)

    );

  }

}
