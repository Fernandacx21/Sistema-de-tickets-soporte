import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotaPublica } from '../models/notaPublicaModel';

@Injectable({
  providedIn: 'root'
})
export class NotaPublicaService {

  private URL_API = 'http://localhost:8080/notaPublica';
  //private URL_API = '/notaPublica';
  selectedNotaPublica!: NotaPublica;
  PublicNote!: NotaPublica[];

  constructor(private http: HttpClient) {
    this.selectedNotaPublica = new NotaPublica();
  }

  getAllNotasPublicasByTicket(idTicket: any) {
    return this.http.get(this.URL_API + `/getAllNotasPublicasByTicket/${idTicket}`);
  }

  addNotaPublica(notaPublica: NotaPublica) {
    return this.http.post<NotaPublica>(this.URL_API + '/addNotaPublica', notaPublica);
  }

}
