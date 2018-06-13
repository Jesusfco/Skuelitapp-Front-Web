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
  public request: number = 0;

  public search: any = {
    limit: 0,
  };

  

  public newPaymentObserver: any;
  public editPaymentObserver: any;

  constructor(private _http: PaymentService) {

    this.getPaymentTypes();
    

    this.setEditPaymentObserver();
    this.setNewPaymentObserver();

   }

  ngOnInit() {

  }

  getPaymentTypes() {

    this.request++;

    this._http.get(this.search).then(

      data => {

        this.payments = [];

        for(let d of data) {

          let pay: PaymentType = new PaymentType();
          pay.setData(d);
          this.payments.push(pay);

        }
        
      }, error => sessionStorage.setItem('request', error)
    ).then(
      () => this.request--
    );
  }

  

  setNewPaymentObserver() {
    this.newPaymentObserver = setInterval(() => this.newPaymentObserverLogic(), 1000);
  }

  newPaymentObserverLogic(){
    if(sessionStorage.getItem('newPayment') == undefined) return;

    let newPayment = JSON.parse(sessionStorage.getItem('newPayment'));
    let x = new PaymentType();
    x.setData(newPayment);
    this.payments.unshift(x);
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
