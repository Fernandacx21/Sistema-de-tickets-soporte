import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTipoContrato'
})
export class FilterTipoContratoPipe implements PipeTransform {

  transform(tipoContrato: any[], arg: any): any {
    let resultContrato: string[] = [];
    for(let documento of tipoContrato) {
      if(documento.tipo_contrato.indexOf(arg) > -1) {
        resultContrato = [...resultContrato, documento];
      }
    }
    return resultContrato;
  }
}
