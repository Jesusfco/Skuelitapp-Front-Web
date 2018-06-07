import { Component, OnInit } from '@angular/core';
import { PaymentType } from '../class/PaymentType';
import { PaymentService } from './payment.service';
import { Period } from '../class/Period';

@Component({
  selector: 'app-payment-administration',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentAdministrationComponent implements OnInit {

  public payments: Array<PaymentType> = [];
  public periods: Array<Period> = [];
  public request: Boolean = false;

  public search: any = {
    limit: 0,
  };

  public searchPeriod: any;

  public newPaymentObserver: any;
  public editPaymentObserver: any;

  constructor(private _http: PaymentService) {

    this.getPaymentTypes();
    this.getLatestPeriods();

    this.setEditPaymentObserver();
    this.setNewPaymentObserver();

   }

  ngOnInit() {

  }

  getPaymentTypes() {

    this.request = true;

    this._http.get(this.search).then(
      data => {

        this.payments = [];

        for(let d of data) {

          let pay: PaymentType = new PaymentType();
          pay.setData(d);
          this.payments.push(pay);

        }
        
      }
    ).then(
      () => this.request = false
    ).catch(

      error => sessionStorage.setItem('request', error)

    );
  }

  getLatestPeriods() {

    this.request = true;

    this._http.periods().then(
      data => {

        this.periods = [];

        for(let p of data){
          
          let z: Period = new Period();
          z.setDataEdit(p);
          this.periods.push(z);

        }

        if(this.periods[0] != undefined) {
          this.searchPeriod = this.periods[0].id;
        }

      }
    ).then(
      () => this.request = false
    ).catch(

      error => sessionStorage.setItem('request', error)

    );
  }

  getDatePayment(id) {

    this.request = true;


    
    this._http.periods().then(
      data => {

        for(let p of data){
          
          let z: Period = new Period();
          z.setDataEdit(p);
          this.periods.push(z);

        }

        if(this.periods[0] != undefined) {
          this.searchPeriod = this.periods[0].id;
        }

      }
    ).then(
      () => this.request = false
    ).catch(

      error => sessionStorage.setItem('request', error)

    );

  }

  redirectDate(payment) {
    let parameters = {
      from: null,
      to: null,
      plan: payment.name,
      quantity: payment.quantity,
      payment_type_id: payment.id,
      period_id: this.searchPeriod
    };

    for(let x of this.periods) {
      if(x.id == this.searchPeriod) {
        parameters.from = x.from;
        parameters.to = x.to;
        break;
      }
    }

    sessionStorage.setItem('parametersDatesPayment', JSON.stringify(parameters));
  }

  setNewPaymentObserver() {
    this.newPaymentObserver = setInterval(() => this.newPaymentObserverLogic(), 1000);
  }

  newPaymentObserverLogic(){
    if(sessionStorage.getItem('newPayment') == undefined) return;

    let newPayment = JSON.parse(sessionStorage.getItem('newPayment'));
    this.payments.unshift(newPayment);
    sessionStorage.removeItem('newPayment');

  }

  setEditPaymentObserver() {
    this.editPaymentObserver = setInterval(() => this.editPaymentObserverLogic(), 1000);
  }

  editPaymentObserverLogic() {
    if(sessionStorage.getItem('editedPayment') == undefined) return;

    let editedPayment = JSON.parse(sessionStorage.getItem('editedPayment'));

    for(let i = 0; i < this.payments.length; i++) {
      if(this.payments[i].id == editedPayment.id) {
        this.payments[i] = editedPayment;
        break;
      }
    }

    sessionStorage.removeItem('editedPayment');

  }

}
