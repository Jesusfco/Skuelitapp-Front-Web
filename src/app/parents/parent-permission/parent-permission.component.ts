import { Component, OnInit } from '@angular/core';
import { PermissionRequest } from '../../class/PermissionRequest';
import { ParentsService } from '../parents.service';

@Component({
  selector: 'app-parent-permission',
  templateUrl: './parent-permission.component.html',
  styleUrls: ['./parent-permission.component.css']
})
export class ParentPermissionComponent implements OnInit {

  public permissions: Array<PermissionRequest> = [];

  constructor(private _http: ParentsService) { }

  ngOnInit() {
  }

}
