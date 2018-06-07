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
      this.dates.push(x);

    }

  }

}
