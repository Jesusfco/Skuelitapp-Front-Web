import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../teachers.service';
import { Schedule } from '../../class/Schedule';

@Component({
  selector: 'app-teachers-schedule',
  templateUrl: './teachers-schedule.component.html',
  styleUrls: ['./teachers-schedule.component.css']
})
export class TeachersScheduleComponent implements OnInit {

  public schedules: Array<Schedule> = [];
  public days = [
    {id: 1, name: 'LUNES'},
    {id: 2, name: 'MARTES'},
    {id: 3, name: 'MIERCOLES'},
    {id: 4, name: 'JUEVES'},
    {id: 5, name: 'VIERNES'},
    {id: 6, name: 'SABADO'},
  ];

  constructor(private _http: TeachersService) {
    this.setSchedules();
   }


  ngOnInit() {
  }

  setSchedules() {
    this._http.getSchedule().then(
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
