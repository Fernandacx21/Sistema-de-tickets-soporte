import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tecnico'
})
export class TecnicoPipe implements PipeTransform {

  transform(tecnico: any[], arg: any): any {
    let resultTech: string[] = [];
    for (let tech of tecnico) {
      if (tech.usuario.nombre_usuario?.indexOf(arg) > -1) {
        resultTech = [...resultTech, tech];
      }
    }
    return resultTech;
  }

}
