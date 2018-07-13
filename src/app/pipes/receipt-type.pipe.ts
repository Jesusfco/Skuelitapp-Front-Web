import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'receiptType'
})
export class ReceiptTypePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if(value == 1) { return 'PARCIALIDAD'; }
    else if(value == 2) { return 'INSCRIPCIÓN'; }
    // else if(value == 3) { return 'FINALIZADO'; }
    
    else {
      return null;
    }
  }

}
