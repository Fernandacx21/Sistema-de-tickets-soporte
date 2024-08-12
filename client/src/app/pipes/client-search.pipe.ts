import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientSearch'
})
export class ClientSearchPipe implements PipeTransform {

  transform(client: any, arg: any): any {
    if(arg.length < 3) return client;
    let resultClient = [];
    for(let cliente of client) {
      if (cliente.nombre_cliente.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultClient.push(cliente);
      }
    }
    return resultClient;
  }

}
