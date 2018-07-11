import { cardPop, backgroundOpacity } from './../../animations';
import { GroupService } from './../group.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Group } from '../../class/Group';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class DeleteGroupComponent implements OnInit {

  public group: Group = new Group();
  public observerRef: any;
  public output: any;
  public request: number = 0;

  public safeDelete =  {
    message: null,
    safe: false,
    // groups: 0,
  };

  public state = {
    background: 'initial',
    card: 'initial',
  };

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.closePop();
    }

  }

  constructor(private _http: GroupService,
              private router: Router,
              private actRou: ActivatedRoute) {

    this.observerRef = actRou.params.subscribe(params => {

      this.group.id = params['id'];
      this.getData();

    });

    this.output = this._http.getData().subscribe(x => {
      
      if (x.action == 'SHOW') {
        this.group.setData(x.data);
        console.log(x.data);

      } 
      
    });

  }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 5);
  }

  closePop() {

    setTimeout(() => {
      this.router.navigate(['./grupos']);
    }, 350);

    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  getData() {

    this.request++;

    this._http.safeDelete(this.group).then(
      data => {

        this.safeDelete.safe = data.safe;
        this.group.setData(data.group);

        this.setMessage();

      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then(

      () => this.request--

    );

  }

  deleteGroup() {

  }

  setMessage() {

    if(this.safeDelete.safe) {

      this.safeDelete.message = 'Es seguro borrar este grupo. Los Alumnos asignados a este grupo tendran que ser asignados a un grupo de nuevo. ¿Desea Eliminar el Grupo?';

    } else {

      this.safeDelete.message = 'No es posible borrar este Grupo, el Periodo al  que pertenecen se encuentra actualmente activo o finalizado y forma parte de los registros.';

    }

  }

}
