import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeChat'
})
export class TimeChatPipe implements PipeTransform {

  transform(value: string, args?: any): string {

    let created_at = new Date(value);
    let now = new Date();

    if(now.getDate() == created_at.getDate() && now.getMonth() == created_at.getMonth() && now.getFullYear() == created_at.getFullYear()) {

      if(created_at.getHours() > 11) {

        if(created_at.getHours() == 12){

          return '12:' + created_at.getMinutes() + ' P.M.';

        } else {

          return (created_at.getHours() - 12 ) + ':' + created_at.getMinutes() + ' P.M.'; 

        }

      } else {

        if(created_at.getHours() == 0) {

          return '12:' + created_at.getMinutes() + ' A.M.';

        }

        else {

          return created_at.getHours() + ':' + created_at.getMinutes() + ' A.M.';

        }

      }

    } else {

      return created_at.getDate() + '/' + (created_at.getMonth() + 1) + '/' + created_at.getFullYear();

    }

    
  }

}
