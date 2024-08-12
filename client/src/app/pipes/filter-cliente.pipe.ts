import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCliente'
})
export class FilterClientePipe implements PipeTransform {

  transform(cliente: any[], arg: any): any {
    let resultClient: string[] = [];
    for(let client of cliente) {
      if(client.cliente.nombre_cliente?.indexOf(arg) > -1) {
        resultClient = [...resultClient, client];
      }
    }
    return resultClient;
  }

}
