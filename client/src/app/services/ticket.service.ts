import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/ticketModel';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private URL_API = 'http://localhost:8080/ticket'
  //private URL_API = '/ticket'
  selectedTicket!: Ticket;
  ticket!: Ticket[];

  constructor(private http: HttpClient) {
    this.selectedTicket = new Ticket();
  }

  getAllTickets() {
    return this.http.get(this.URL_API + '/getAllTickets');
  }

  getOneTicket(idTicket: any) {
    return this.http.get(this.URL_API + `/getOneTicket/${idTicket}`);
  }

  addNewTicket(ticket: Ticket) {
    return this.http.post<Ticket>(this.URL_API + '/addTicket', ticket);
  }

  updateTicket(ticket: Ticket) {
    return this.http.put(this.URL_API + `/updateTicket/${ticket.idTicket}`, ticket);
  }

  deleteTicket(idTicket: any) {
    return this.http.delete(this.URL_API + `/deleteTicket/${idTicket}`);
  }

}