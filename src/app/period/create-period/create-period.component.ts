import { Component, OnInit } from '@angular/core';
import { PeriodService } from '../period.service';
import { Period } from '../../class/Period';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-period',
  templateUrl: './create-period.component.html',
  styleUrls: ['./create-period.component.css']
})
export class CreatePeriodComponent implements OnInit {

  public period = new Period();

  constructor(private _http: PeriodService, private router: Router) { }

  ngOnInit() {
  }

  closeWindow() { this.router.navigate(['/users']); }
  
}
