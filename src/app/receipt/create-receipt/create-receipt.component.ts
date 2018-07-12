import { backgroundOpacity, cardPop } from './../../animations';
import { Component, OnInit, HostListener } from '@angular/core';
import { ReceiptService } from '../receipt.service';
import { Receipt } from '../../class/Receipt';
import { User } from '../../class/User';
import { Router } from '@angular/router';
import { PaymentType } from '../../class/PaymentType';
import { Period } from '../../class/Period';

@Component({
  selector: 'app-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class CreateReceiptComponent implements OnInit {

  public receipt: Receipt = new Receipt();
  public student: User = new User();
  public sugestUsers: Array<User> = [];
  public timer: number  = 0;
  public form: number = 1;
  public idMessage: String = null;

  public paymentType: PaymentType = new PaymentType();
  public period: Period = new Period();
  public receipts: Array<Receipt> = [];
  public infoTable: Array<any> = [];

  public state = {
    background: 'initial',
    card: 'initial',
  };

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27 && this.form == 1) {
        this.closePop();
    } else if($event.keyCode == 27 && this.form > 1) {
      this.form--;
    }

  }

  constructor(
    private _http: ReceiptService,
    private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 5);
  }

  closePop() {

    setTimeout(() => {
      this.router.navigate(['./recibos']);
    }, 350);

    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  searchSugest(key){

    if(key.keyCode >= 37 && key.keyCode <= 40 || key.keyCode == 13 || key.keyCode == 9) return;

    this.timer++;    

    setTimeout(() => {      
      this.timer--;      
    }, 300);

    setTimeout(() => {
      
      if(this.timer == 0){
        // this.sendingData.sugest = true;
        this._http.sugestUser(this.student).then(
          data => {
            this.sugestUsers = data;
          }, error => console.log(error)
        ).then(
          // () => this.sendingData.sugest = false
        );
      }

    }, 350);
  }

  setUserSelected(student) {

    this.student.setData(student);
    setTimeout(() => this.student.setData(student), 50);
    this.form = 2;
    this.getPaymentInformation();

  }

  getUserById(e) {

    if(e.keyCode == 13) {

      this._http.getStudentById(this.student.id).then(

        data => {

          if(data.name != undefined) {

            this.student.setData(data);
            this.sugestUsers.push(data);
            this.idMessage = null;
            this.form = 2;
            this.getPaymentInformation();

          } else {

            this.idMessage = "ID: " + this.student.id + " INEXISTENTE";

          }
          
        }, error => console.log(error)
      ).then(
        // () => this.sendingData.sugest = false
      );

    }
    
  }

  cancelUserSearch() {
    this.student = new User();
    this.idMessage = null;
  }

  continueUserSelected() {

  }

  getPaymentInformation() {

    this._http.getPaymentInformation(this.student).then(

      data => {
        
        this.paymentType.setData(data.paymentType);
        this.period.setDataEdit(data.period);
        this.receipts = [];
        for(let d of data.receipts) {
          let r = new Receipt();
          r.setData(d);
          r.user_name = this.student.name + " " + this.student.patern_surname + " " + this.student.matern_surname;
          this.receipts.push(r);
        }
      }, error => sessionStorage.setItem('request', JSON.stringify(error))

    );

  }

  

}
