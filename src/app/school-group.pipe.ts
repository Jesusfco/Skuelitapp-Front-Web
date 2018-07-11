import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'schoolGroup'
})
export class SchoolGroupPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    
    if(value == 1) { return 'A'; }
    else if(value == 2) { return 'B'; }
    else if(value == 3) { return 'C'; }
    else if(value == 4) { return 'D'; }
    else if(value == 5) { return 'E'; }
    else if(value == 6) { return 'F'; }
    else if(value == 7) { return 'G'; }
    else if(value == 8) { return 'H'; }
    else if(value == 9) { return 'I'; }
    else if(value == 10) { return 'J'; }
    else if(value == 11) { return 'K'; }
    else if(value == 12) { return 'L'; }
    else if(value == 13) { return 'M'; }
    else if(value == 14) { return 'N'; }
    else if(value == 15) { return 'O'; }
    else if(value == 16) { return 'P'; }
    else if(value == 17) { return 'Q'; }
    else if(value == 18) { return 'R'; }
    else if(value == 19) { return 'S'; }
    else if(value == 20) { return 'T'; }
    else if(value == 21) { return 'U'; }
    else if(value == 22) { return 'V'; }
    else if(value == 23) { return 'X'; }
    else if(value == 24) { return 'Y'; }
    else if(value == 25) { return 'Z'; }
    else {
      return "NULO";
    }

  }

}
