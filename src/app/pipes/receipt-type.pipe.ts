import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'receiptType'
})
export class ReceiptTypePipe implements PipeTransform {

  transform(value: number, args?: any): String {

    if(value == 1) {
      return 'Parcialidad';
    } else if( value == 2) {
      return 'Inscripción';
    }
    return null;
  }

}
