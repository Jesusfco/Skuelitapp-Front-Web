import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../class/storage';

@Injectable()
export class GroupService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  getGroups(parameters) {
    return this._http.post(this.link.url + 'groups/getGroups' + this.token.getTokenUrl(), parameters)
      .map(data => data.json())
      .toPromise();
  }

  postGroups(groups) {
    return this._http.post(this.link.url + 'groups/storeGroups' + this.token.getTokenUrl(), groups)
      .map(data => data.json())
      .toPromise();
  }

  postGroup(group) {
    return this._http.post(this.link.url + 'groups/storeGroup' + this.token.getTokenUrl(), group)
      .map(data => data.json())
      .toPromise();
  }

  getPeriods() {
    return this._http.get(this.link.url + 'groups/getPeriods' + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

  getLevels() {
    return this._http.get(this.link.url + 'groups/getLevels' + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

  getPeriodType() {
    return this._http.get(this.link.url + 'periodType' + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  } 

  getSchoolLevelModalities() {
    return this._http.get(this.link.url + 'groups/getSchoolLevelModalities' + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

  deleteGroup(group) {
    return this._http.delete(this.link.url + 'groups/delete/' + group.id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  showGroup(group) {
    return this._http.get(this.link.url + 'groups/show/' + group.id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  getPosibleStudents(group) {
    return this._http.get(this.link.url + 'groups/posibleStudents/' + group.id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  getSubjectsFromGroup(group) {
    return this._http.get(this.link.url + 'groups/allSubjects/' + group.id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  postSubjectsFromGroup(group) {
    return this._http.post(this.link.url + 'groups/updateSubjects' + this.token.getTokenUrl(), group)
              .map(data => data.json())
              .toPromise();
  }

  showPeriod(id) {
    return this._http.get(this.link.url + 'period/' + id + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

  syncUserGroupId(parameters) {
    return this._http.post(this.link.url + 'groups/assignGroup' + this.token.getTokenUrl(), parameters)
      .map(data => data.json())
      .toPromise();
  }

  getSchedules(group) {
    return this._http.get(this.link.url + 'groups/schedules/' + group.id + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

  getTeachers(parameters) {
    return this._http.post(this.link.url + 'groups/searchTeachers' + this.token.getTokenUrl(), parameters)
      .map(data => data.json())
      .toPromise();
  }

  storeSchedule(schedule) {
    return this._http.post(this.link.url + 'schedules/store' + this.token.getTokenUrl(), schedule)
      .map(data => data.json())
      .toPromise();
  }

  deleteSchedule(schedule) {
    return this._http.delete(this.link.url + 'schedules/delete/' + schedule.id + this.token.getTokenUrl())
      .map(data => data.json())
      .toPromise();
  }

}
