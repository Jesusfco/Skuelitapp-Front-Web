import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(value == null) return ' ';

    let values = value.split('-');

    if(values[1] == '01') {
      values[1] = 'Enero';
    } else if (values[1] == '02') {
      values[1] = 'Febrero';
    } else if (values[1] == '03') {
      values[1] = 'Marzo';
    } else if (values[1] == '04') {
      values[1] = 'Abril';
    } else if (values[1] == '05') {
      values[1] = 'Mayo';
    } else if (values[1] == '06') {
      values[1] = 'Junio';
    } else if (values[1] == '07') {
      values[1] = 'Julio';
    } else if (values[1] == '08') {
      values[1] = 'Agosto';
    } else if (values[1] == '09') {
      values[1] = 'Septiembre';
    } else if (values[1] == '10') {
      values[1] = 'Octubre';
    } else if (values[1] == '11') {
      values[1] = 'Noviembre';
    } else if (values[1] == '12') {
      values[1] = 'Diciembre';
    }

    // return values[2] + ' de ' + values[1] + ' del ' + values[0];
    return values[2] + '/' + values[1] + '/' + values[0];
  }

}
