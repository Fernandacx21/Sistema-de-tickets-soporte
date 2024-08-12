import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'servicioSearch'
})
export class ServicioSearchPipe implements PipeTransform {

  transform(service: any[], arg: any): any {
    if(arg.length < 3) return service;
    let resultService = [];
    for(let servicio of service){
      if(servicio.nombre_servicio.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultService.push(servicio);
      }
    }
    return resultService;
  }

}
