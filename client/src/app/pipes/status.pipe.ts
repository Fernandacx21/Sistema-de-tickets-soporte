import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(status: any[], arg: any): any {
      let resultTicket: string[] = [];
      for(let ticket of status) {
        if(ticket.status.indexOf(arg) > -1) {
          resultTicket = [...resultTicket, ticket];
        };
      }
      return resultTicket;
  }

}
