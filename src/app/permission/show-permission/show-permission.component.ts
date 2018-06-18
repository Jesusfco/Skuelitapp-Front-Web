import { Component, OnInit, HostListener } from '@angular/core';
import { PermissionService } from '../permission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionRequest } from '../../class/PermissionRequest';
import { cardPop, backgroundOpacity } from '../../animations';

@Component({
  selector: 'app-show-permission',
  templateUrl: './show-permission.component.html',
  styleUrls: ['./show-permission.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class ShowPermissionComponent implements OnInit {

  public permission: PermissionRequest = new PermissionRequest();
  public request: number = 0;
  public observerRef: any;
  public state = {
    background: 'initial',
    card: 'initial',
  };

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.closePop();
    }
  }
  
  constructor(private _http: PermissionService, private router: Router, private actRou: ActivatedRoute) {


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
      this.router.navigate(['./permisos']);
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



  update() {

  }

  confirm() {
    this._http.validate(this.permission).then(
      data => {
        const error = {
          title: 'Permiso Validado',
          description: 'Datos cargados correctamente al servidor',
          status: 200
        };
        this.permission.confirmed = true;
        sessionStorage.setItem('request', JSON.stringify(error));
        sessionStorage.setItem('updatePermission', JSON.stringify(this.permission));
      },
      error => sessionStorage.setItem('request', JSON.stringify(error))
    );
  }

  negate() {
    this._http.negate(this.permission).then(
      data => {
        const error = {
          title: 'Permiso Negado',
          description: 'Datos cargados correctamente al servidor',
          status: 200
        };
        this.permission.confirmed = false;
        sessionStorage.setItem('request', JSON.stringify(error));
        sessionStorage.setItem('updatePermission', JSON.stringify(this.permission));
      },
      error => sessionStorage.setItem('request', JSON.stringify(error))
    );
  }

}
