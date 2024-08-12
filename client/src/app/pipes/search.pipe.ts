import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(asunto: any[], arg: any): any {
    if(arg.length < 3) return asunto;
    let resultAsunto: string[] = []
    for(let ticket of asunto) {
      if(ticket.asunto.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultAsunto = [...resultAsunto, ticket]
      }
    }
    return resultAsunto;
  }

}
