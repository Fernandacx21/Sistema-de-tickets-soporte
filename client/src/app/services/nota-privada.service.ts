import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotaPrivada } from '../models/notaPrivadaModel';

@Injectable({
  providedIn: 'root'
})
export class NotaPrivadaService {

  private URL_API = 'http://localhost:8080/notaPrivada';
  //private URL_API = '/notaPrivada';
  selectedNotaPrivada!: NotaPrivada;
  privateNote!: NotaPrivada[];

  constructor(private http: HttpClient) {
    this.selectedNotaPrivada = new NotaPrivada();
   }

   addPrivateNote(privateNote: NotaPrivada) {
    return this.http.post<NotaPrivada>(this.URL_API + '/addNotaPrivada', privateNote);
   }

   getAllNotasPrivadasByTicket(idTicket: any) {
    return this.http.get(this.URL_API + `/getAllNotasPrivadasByTicket/${idTicket}`);
   }

}
