import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  private URL_API = 'http://localhost:8080/kpis';
  //private URL_API = '/kpis';

  constructor(private http: HttpClient) { }

  getTicketLength(){
    return this.http.get(this.URL_API + '/getTicketLength');
  }
  getTicketPendiente(){
    return this.http.get(this.URL_API + '/getTicketPendiente')
  }
  getTicketEnProceso(){
    return this.http.get(this.URL_API + '/getTicketEnProceso')
  }
  getTicketResuelto(){
    return this.http.get(this.URL_API + '/getTicketResuelto')
  }
  getTicketCerrado(){
    return this.http.get(this.URL_API + '/getTicketCerrado')
  }

  getTicketsByTecnico() { 
    return this.http.get(this.URL_API + `/getTicketByTecnico`);
  }
  getTicketsByDept(){
    return this.http.get(this.URL_API + '/getticketByDept')
  }
  getHorasByTicket(idTicket: any) {
    return this.http.get(this.URL_API + `/getHoraByTicket/${idTicket}`);
  }
  getTicketByCliente() {
    return this.http.get(this.URL_API + '/getTicketByCliente');
  }
  getTareaByUsuario(){
    return this.http.get(this.URL_API + '/getTareaByUsuario');
  }

}
