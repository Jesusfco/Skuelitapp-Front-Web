import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentType } from '../../class/PaymentType';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';
import { cardPop, backgroundOpacity} from '../../animations';
import { PeriodType } from '../../class/PeriodType';

@Component({
  selector: 'app-create-payment-type',
  templateUrl: './create-payment-type.component.html',
  styleUrls: ['./create-payment-type.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class CreatePaymentTypeComponent implements OnInit {

  public payment: PaymentType = new PaymentType();
  public periodTypes: Array<PeriodType> = [];
  public request: Boolean = false;

  public state = {
    background: 'initial',
    card: 'initial',
  };

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.closePop();
    }

  }

  constructor(private _http: PaymentService,
              private router: Router) { 
                this.setPeriodType();
  }

  ngOnInit() {

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 5);

  }

  closePop(){

    setTimeout(() => {
      this.router.navigate(['./administracion-de-pagos']);
    }, 350);

    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  createPaymentType(){

    if (!this.payment.validateALL()) { return; }

    this.request = true;

    this._http.store(this.payment).then(
      data => {

        let not = {
          title: 'Periodo Registrado',
          description: 'Los datos han sido guardados en el servidor',
          status: 200
        };

        sessionStorage.setItem('request', JSON.stringify(not));
        sessionStorage.setItem('newPayment', JSON.stringify(data));

        this.closePop();
      }
    ).then(
      () => this.request = false
    ).catch(
      error => sessionStorage.setItem('request', JSON.stringify(error))
    );

  }

  setPeriodType() {
    this._http.getPeriodType().then(
      
      data => {

        this.periodTypes = [];

        for(let d of data ){

          if(d.active ){

            let x: PeriodType = new PeriodType();
            x.setData(d);
            this.periodTypes.push(x);

          } 

        }

      }, 
      
      error => sessionStorage.setItem('request', error)

    ).then ( () => this.request = false );
  }
  
}
