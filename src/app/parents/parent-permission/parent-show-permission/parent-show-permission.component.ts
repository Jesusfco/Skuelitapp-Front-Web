import { Component, OnInit, HostListener } from '@angular/core';
import { PermissionRequest } from '../../../class/PermissionRequest';
import { User } from '../../../class/User';
import { backgroundOpacity, cardPop } from '../../../animations';
import { ParentsService } from '../../parents.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parent-show-permission',
  templateUrl: './parent-show-permission.component.html',
  styleUrls: ['./parent-show-permission.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class ParentShowPermissionComponent implements OnInit {

  public permission: PermissionRequest = new PermissionRequest();
  public children: Array<User> = [];
  public request: number = 0;
  public observerRef: any;
  public edit: Boolean = false;
  public state = {
    background: 'initial',
    card: 'initial',
  };

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.closePop();
    }
  }
  
  constructor(private _http: ParentsService, private router: Router, private actRou: ActivatedRoute) {

    this.setChildren();

    this.observerRef = actRou.params.subscribe(params => {
      this.permission.id = params['id'];
      this.setPermission();
    });

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

  setPermission() {
    this.request++;
    this._http.showPermission(this.permission).then(

      data => this.permission.setData(data),
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

      },

      error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then( () => this.request-- );
  }

  update() {

  }

}
