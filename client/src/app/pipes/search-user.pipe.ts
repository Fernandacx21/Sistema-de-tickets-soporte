import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(usuario: any[], arg: any): any {
    if (arg < 3) return usuario;
    let resultUser: string[] = [];
    for (let user of usuario) {
      if(user.nombre_usuario.toLowerCase().indexOf(arg.toLowerCase()) < -1) {
        resultUser = [...resultUser, user];
      } else if (user.departamento.nombre_departamento?.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultUser = [...resultUser, user];
      }
    }
    return resultUser;
  }

}
