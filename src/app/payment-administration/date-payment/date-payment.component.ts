import { Component, OnInit } from '@angular/core';
import { PaymentDate } from '../../class/PaymentDate';
import { PaymentService } from '../payment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FadeAnimation, SlideAnimation } from '../../animations';
import { PaymentType } from '../../class/PaymentType';
import { Period } from '../../class/Period';

@Component({
  selector: 'app-date-payment',
  templateUrl: './date-payment.component.html',
  styleUrls: ['./date-payment.component.css'],
  animations: [FadeAnimation, SlideAnimation],

})
export class DatePaymentComponent implements OnInit {

  public request: number = 0;
  public dates: Array<PaymentDate> = [];
  public periods: Array<Period> = [];
  public payment: PaymentType = new PaymentType();
  public observerRef: any;

  public parameters = {
    from: '',
    to: '',
    plan: '',
    quantity: null,
    payment_type_id: null,
    period_id: null
  };

  constructor(private _http: PaymentService, private router: Router, private actRou: ActivatedRoute) {

    this.observerRef = actRou.params.subscribe(params => {
      this.payment.id = params['id'];
      this.parameters.payment_type_id = this.payment.id;
      // this.getGroupData();
      // this.getSubjects();
      this.setPaymentType();
      this.setPeriods();
      
    });
      

      
      

   }

  ngOnInit() {
  }

  closeWindow() { this.router.navigate(['/administracion-de-pagos']); }

  setPaymentType() {

    this.request++;

    this._http.show(this.payment.id).then(

      data => this.payment.setData(data), 
      error => sessionStorage.setItem('request', error)

    ).then(
      () => this.request--
    );
  }

  setDatePayment(){

    this.request++;

    this._http.getDatesPayment(this.parameters).then(
      data => {
        this.dates = [];

        for(let d of data) {

          let x: PaymentDate = new PaymentDate();
          x.setFromData(d);
          this.dates.push(x);

        }

        this.checkUnsetedDates();

      }, error => sessionStorage.setItem('request', error)
    ).then(
      () => this.request--
    );

  }

  checkUnsetedDates() {
    
    if(this.dates.length == this.payment.quantity) {
      return;
    }

    for(let i = this.dates.length; i < this.payment.quantity; i++) {

      let x: PaymentDate = new PaymentDate;
      x.payment_type_id = this.payment.id;
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

    this.request++;

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
      () => this.request--
    ).catch(

      error => sessionStorage.setItem('request', error)

    );
  }

  validateAll() {

    let validated = true ;
    let p: any;

    for(let x of this.periods) {
      if(x.id = this.parameters.period_id){
        p = x;
        break;
      }
    }

    for (let i = 0; i < this.dates.length; i++) {
      this.dates[i].restoreValidations();
      this.dates[i].validateDate(p);
    } 

    for (let i = 0; i < this.dates.length; i++) {

      if (this.dates[i].validations.validate == false) {
        validated = false;
        break;
      }
      
    }

    return validated;

  }

  setPeriods() {
    this.request++;
    this._http.getOwnPeriods(this.payment).then(
      data => {
        this.periods = [];
        for(let d of data){
          let x = new Period();
          x.setDataEdit(d);
          this.periods.push(x);
        }
        if(this.periods[0] != undefined) {
          this.parameters.period_id = this.periods[0].id;
          this.setDatePayment();
        }
      }, error => sessionStorage.setItem('request', error)
    ).then(
      () => this.request--
    );

  }

}
