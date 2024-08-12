import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prioridad'
})
export class PrioridadPipe implements PipeTransform {

  transform(prioridad: any[], arg: any): any {
    let resultPriority: string[] = [];
    for(let priority of prioridad) {
      if(priority.prioridad.indexOf(arg) > -1) {
        resultPriority = [...resultPriority, priority];
      }
    }
    return resultPriority;
  }

}
