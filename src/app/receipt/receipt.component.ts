import { Component, OnInit } from '@angular/core';
import { Receipt } from '../class/Receipt';
import { ReceiptService } from './receipt.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public receipts: Array<Receipt> = [];
  public lenghtArrayOptions: Array<number> = [ 10, 25, 50, 100, 200 ];

  public request: number = 1;
  public outletOutput: any;

  public pageEvent: PageEvent = {
    pageIndex: 1,
    pageSize: 25,
    length: 0
  };

  constructor(private _http: ReceiptService) {

    this.setReceipts();

    this.outletOutput = this._http.getData().subscribe(x => {
      
      if (x.action == 'NEW') {

        this.pushNewReceipt(x.data);

      } 
      
    });

   }

  ngOnInit() {
  }

  paginatorEvent($event){
    
    this.pageEvent = $event;
    this.setReceipts();

  }

  setReceipts() {

    this.request++;

    this._http.getReceipts(this.pageEvent).then(
      data => {
        // console.log(data);
        this.pageEvent.length = data.total;
        this.receipts = [];

        for(let d of data.data) {
          let re: Receipt = new Receipt();
          re.setData(d);
          this.receipts.push(re);
        }

      }, error => sessionStorage.setItem('request', JSON.stringify(error))
    ).then( () => this.request-- );

  }

  pushNewReceipt(receipt: Receipt){

    this.receipts.unshift(receipt);

  }

}
