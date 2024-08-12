import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_API = 'http://localhost:8080/auth';
  //private URL_API = '/auth';

  user!: Usuario[];

  constructor(private http: HttpClient) { }

  SingIn(user: Usuario) {
    return this.http.post<Usuario>(this.URL_API + '/singIn', user);
  }

  LogOut() {
    return this.http.get(this.URL_API + '/logOut');
  }

  Logueado() {
    return !!localStorage.getItem('ACCESS_TOKEN');
  }

}
