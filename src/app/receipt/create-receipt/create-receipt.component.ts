import { backgroundOpacity, cardPop } from './../../animations';
import { Component, OnInit, HostListener } from '@angular/core';
import { ReceiptService } from '../receipt.service';
import { Receipt } from '../../class/Receipt';
import { User } from '../../class/User';
import { Router } from '@angular/router';

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

  public state = {
    background: 'initial',
    card: 'initial',
  };

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.closePop();
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

    if(key.keyCode >= 37 && key.keyCode <= 40 || key.keyCode == 13) return;

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

}
