import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchContrato'
})
export class SearchContratoPipe implements PipeTransform {

  transform(contrato: any[], arg: any): any {
    if(arg.length < 3) return contrato;
    let resultContrato: string[] = [];
    for(let document of contrato) {
      if(document.nombre_documento.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultContrato.push(document);
      }
    }
    return resultContrato;
  }

}
