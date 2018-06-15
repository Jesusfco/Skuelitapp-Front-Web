import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../class/Schedule';
import { ParentsService } from '../parents.service';
import { User } from '../../class/User';


@Component({
  selector: 'app-parents-schedules',
  templateUrl: './parents-schedules.component.html',
  styleUrls: ['./parents-schedules.component.css']
})
export class ParentsSchedulesComponent implements OnInit {

  public schedules: Array<Schedule> = [];
  public days = [
    {id: 1, name: 'LUNES'},
    {id: 2, name: 'MARTES'},
    {id: 3, name: 'MIERCOLES'},
    {id: 4, name: 'JUEVES'},
    {id: 5, name: 'VIERNES'},
    {id: 6, name: 'SABADO'},
  ];

  public children: Array<User> = [];
  public select: any;

  constructor(private _http: ParentsService) {
    this.setChildren();
   }


  ngOnInit() {
  }

  setChildren() {
    this._http.getChildrens().then(
      data => {
        this.children = []; 
        for(let d of data) {
          const x: User = new User();
          x.setData(d);
          this.children.push(x);
        }

        if(this.children.length > 0) {
          this.select = this.children[0].id;
          this.setSchedules();
        }

      },
      error => sessionStorage.setItem('request', JSON.stringify(error))
    );
  }

  setSchedules() {
    this._http.getSchedule(this.select).then(
      data => {
        this.schedules = [];
        for(let d of data) {
          const x: Schedule = new Schedule();
          x.setData(d);
          this.schedules.push(x);
        }
      },
      error => sessionStorage.setItem('request', JSON.stringify(error))
    );
  }

}
