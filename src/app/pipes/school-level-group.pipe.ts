import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'schoolLevelGroup'
})
export class SchoolLevelGroupPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if(value == 1) { return 'KINDER'; }
    else if(value == 2) { return 'PRIMARIA'; }
    else if(value == 3) { return 'SECUNDARIA'; }
    else if(value == 4) { return 'PREPARATORIA'; }
    else if(value == 5) { return 'UNIVERSIDAD'; }
    
    else {
      return "NULO";
    }
  }

}
