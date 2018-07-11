import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPeriod'
})
export class StatusPeriodPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if(value == 1) { return 'INACTIVO'; }
    else if(value == 2) { return 'CURSANDO'; }
    else if(value == 3) { return 'FINALIZADO'; }
    
    else {
      return null;
    }
  }

}
