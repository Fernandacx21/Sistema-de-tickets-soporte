import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarioModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL_API = 'http://localhost:8080/usuario';
  //private URL_API = '/usuario';
  selectedUsuario!: Usuario;
  usuario!: Usuario[];

  constructor(private http: HttpClient) {
    this.selectedUsuario = new Usuario();
   }

   getAllUsuarios() {
     return this.http.get(this.URL_API + '/getAllUsuarios');
   }

   getUsuario(idUser: any) {
    return this.http.get(this.URL_API + `/getUsuario/${idUser}`);
   }

   addUsuario(User: Usuario) {
     return this.http.post<Usuario>(this.URL_API + '/addUsuario', User);
   }

   updateUsuario(User: Usuario) {
     return this.http.put<Usuario>(this.URL_API + `/updateUsuario/${User.idUsuario}`, User);
   }

   deleteUsuario(idUsuario: any) {
     return this.http.delete(this.URL_API + `/deleteUsuario/${idUsuario}`);
   }

}
