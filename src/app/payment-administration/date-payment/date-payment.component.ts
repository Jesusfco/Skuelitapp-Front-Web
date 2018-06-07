import { Component, OnInit } from '@angular/core';
import { PaymentDate } from '../../class/PaymentDate';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';
import { FadeAnimation, SlideAnimation } from '../../animations';

@Component({
  selector: 'app-date-payment',
  templateUrl: './date-payment.component.html',
  styleUrls: ['./date-payment.component.css'],
  animations: [FadeAnimation, SlideAnimation],

})
export class DatePaymentComponent implements OnInit {

  public request: Boolean = false;
  public dates: Array<PaymentDate> = [];
  public parameters = {
    from: '',
    to: '',
    plan: '',
    quantity: null,
    payment_type_id: null,
    period_id: null
  };

  constructor(private _http: PaymentService, private router: Router) {

      
      if(sessionStorage.getItem('parametersDatesPayment') == undefined) {
        this.closeWindow();
      }

      this.parameters = JSON.parse(sessionStorage.getItem('parametersDatesPayment'));
      this.setDatePayment();

   }

  ngOnInit() {
  }

  closeWindow() { this.router.navigate(['/administracion-de-pagos']); }

  setDatePayment(){
    this.request = true;

    this._http.getDatesPayment(this.parameters).then(
      data => {
        this.dates = [];

        for(let d of data) {

          let x: PaymentDate = new PaymentDate();
          x.setFromData(d);
          this.dates.push(x);

        }

        this.checkUnsetedDates();

      }
    ).then(
      () => this.request = false
    ).catch(

      error => sessionStorage.setItem('request', error)

    );

  }

  checkUnsetedDates() {
    
    if(this.dates.length == this.parameters.quantity) {
      return;
    }

    for(let i = this.dates.length; i < this.parameters.quantity; i++) {

      let x: PaymentDate = new PaymentDate;
      x.payment_type_id = this.parameters.payment_type_id;
      x.period_id = this.parameters.period_id;
      x.setIdRamdom();
      this.dates.push(x);

    }

  }

  editDate(date) {

    for (let i = 0; i < this.dates.length; i++) {
      if(date.id == this.dates[i].id) {
        this.dates[i].edit = true;
      } else {
        this.dates[i].edit = false;
      }
    }

  }

  sendData() {

    if(!this.validateAll()) return;

    this.request = true;

    this._http.postPaymentDates({dates: this.dates}).then(
      
      data => {

        let not = {
          title: 'Fechas de Pago Guardadas',
          description: 'Los datos han sido guardados en el servidor',
          status: 200
        };

        sessionStorage.setItem('request', JSON.stringify(not));

        this.dates = [];

        for(let d of data) {

            let x: PaymentDate = new PaymentDate();
            x.setFromData(d);
            this.dates.push(x);
            
        }

      }

    ).then(
      () => this.request = false
    ).catch(

      error => sessionStorage.setItem('request', error)

    );
  }

  validateAll() {
    let validated = true ;
    for (let i = 0; i < this.dates.length; i++) {
      this.dates[i].restoreValidations();
      this.dates[i].validateDate(this.parameters);
    } 

    for (let i = 0; i < this.dates.length; i++) {

      if (this.dates[i].validations.validate == false) {
        validated = false;
        break;
      }
      
    }

    return validated;

  }

}
