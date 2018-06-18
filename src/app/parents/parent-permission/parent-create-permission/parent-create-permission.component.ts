import { Component, OnInit, HostListener } from '@angular/core';
import { ParentsService } from '../../parents.service';
import { PermissionRequest } from '../../../class/PermissionRequest';
import { backgroundOpacity, cardPop } from '../../../animations';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../class/User';


@Component({
  selector: 'app-parent-create-permission',
  templateUrl: './parent-create-permission.component.html',
  styleUrls: ['./parent-create-permission.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class ParentCreatePermissionComponent implements OnInit {

  public permission: PermissionRequest = new PermissionRequest();
  public children: Array<User> = [];
  public request: number = 0;

  public state = {
    background: 'initial',
    card: 'initial',
  };

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.closePop();
    }
  }

  constructor(private _http: ParentsService, private router: Router) {
    this.setChildren();
   }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 5);
  }

  closePop(){

    setTimeout(() => {
      this.router.navigate(['./solicitud-permiso-tutores']);
    }, 350);

    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  formPermission() {
    if(!this.permission.validateAll()) { return; }

    this.request++;
    
    this._http.createPermission(this.permission).then(

      data => {this.permission.setData(data);
      
        for(let user of this.children) {
          if(this.permission.user_id == user.id){
            this.permission.user_name = user.name + ' ' + user.patern_surname + ' ' + user.matern_surname;
            break;
          }
        }

        sessionStorage.setItem('newPermission', JSON.stringify(this.permission));

      },
      error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then( () => this.request-- );

  }

  setChildren() {

    this.request++;
    this._http.getChildrens().then(

      data => {
        this.children = []; 
        for(let d of data) {
          const x: User = new User();
          x.setData(d);
          this.children.push(x);
        }

        if(this.children.length > 0) {
          this.permission.user_id = this.children[0].id;
          
        }

      },

      error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then( () => this.request-- );
  }

}
