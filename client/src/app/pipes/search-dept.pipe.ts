import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDept'
})
export class SearchDeptPipe implements PipeTransform {

  transform(departamento: any[], arg: any): any {
    if (arg < 3) return departamento;
    let resultDept: string[] = [];
    for (let dept of departamento) {
      if (dept.nombre_departamento.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultDept = [...resultDept, dept];
      }
    }
    return resultDept;
  }

}
