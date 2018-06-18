import { Component, OnInit } from '@angular/core';
import { PermissionRequest } from '../../class/PermissionRequest';
import { ParentsService } from '../parents.service';
import { User } from '../../class/User';

@Component({
  selector: 'app-parent-permission',
  templateUrl: './parent-permission.component.html',
  styleUrls: ['./parent-permission.component.css']
})
export class ParentPermissionComponent implements OnInit {

  public permissions: Array<PermissionRequest> = [];
  public children: Array<User> = [];
  public select: any;

  public newPermissionObserver: any;

  constructor(private _http: ParentsService) { 
    this.setChildren();
    this.setNewPermissionObserver();
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
          this.setPermissions();
        }

      },
      error => sessionStorage.setItem('request', JSON.stringify(error))
    );
  }

  setPermissions() {
    this._http.getPermissions(this.select).then(

      data => {

        this.permissions = [];

        for(let d of data) {

          let x: PermissionRequest = new PermissionRequest();
          x.setData(d);
          this.permissions.push(x);

        }

      },

      error => sessionStorage.setItem('request', JSON.stringify(error))

    );

  }

  setNewPermissionObserver() {
    this.newPermissionObserver = setInterval(() =>  this.logicNewPermissionObserver(), 1000);
  }

  logicNewPermissionObserver() {

    if(sessionStorage.getItem('newPermission') == undefined) return;

    let data = JSON.parse(sessionStorage.getItem('newPermission'));

    let x = new PermissionRequest();
    x.setData(data);
    this.permissions.unshift(x);
    sessionStorage.removeItem('newPermission');

  }

}

