import { cardPop, backgroundOpacity } from './../../animations';
import { Component, OnInit, HostListener, Output, EventEmitter  } from '@angular/core';
import { PeriodService } from '../period.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Period } from '../../class/Period';

@Component({
  selector: 'app-delete-period',
  templateUrl: './delete-period.component.html',
  styleUrls: ['./delete-period.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class DeletePeriodComponent implements OnInit {

  public period: Period = new Period();

  @Output() deletedPer = new EventEmitter();

  public observerRef: any;
  public request: number = 0;
  public safeDelete =  {
    message: null,
    safe: false,
    groups: 0,
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

  constructor(private _http: PeriodService,
              private router: Router,
              private actRou: ActivatedRoute) {

    this.observerRef = actRou.params.subscribe(params => {

      this.period.id = params['id'];
      this.getData();

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
      this.router.navigate(['./periodos']);
    }, 350);

    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  getData() {

    this.request++;

    this._http.checkDelete(this.period).then(

      data => {
        
        this.period.setDataEdit(data.period);
        this.setSafeDelete(data);
        
      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then(

      () => this.request--

    );

  }

  setSafeDelete(data) {

    this.safeDelete.message = null;
    this.safeDelete.safe = data.safe;
    this.safeDelete.groups = data.groups;

    if(this.safeDelete.safe == false) {
      this.safeDelete.message = 'NO ES POSIBLE ELIMINAR EL PERIODO DEBIDO A QUE ' +
      'SE ENCUENTRA EN CURSO ACTUALMENTE CON ' + this.safeDelete.groups + ' GRUPOS ESCOLARES';
    } else {
      this.safeDelete.message = 'ADVERTENCIA: Si elimina el periodo  #' + this.safeDelete.groups + ' grupos escolares pertenecientes al periodo seran eliminados, se tendrá que volver asignar a grupos a cada uno de los usuarios';
    }

  }

  deletePeriod() {

    this.request++;

    this._http.delete(this.period).then(

    data => {

      this._http.sendData({
        period: this.period,
        action: 'DELETE'
      });

      sessionStorage.setItem('request', JSON.stringify({
        title: 'Periodo Eliminado',
        description: 'Datos eliminados y actualizados en el servidorr',
        status: 200
      }));

      this.closePop();

    }, error => sessionStorage.setItem('request', JSON.stringify(error))

  ).then( () => this.request-- );

  }

}
