import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/clienteModel';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URL_API = 'http://localhost:8080/cliente';
  //private URL_API = '/cliente';

  selectedCliente!: Cliente;
  cliente!: Cliente[];

  constructor(private http: HttpClient) { 
    this.selectedCliente = new Cliente();
  }

  getAllClientes() {
    return this.http.get(this.URL_API + '/getAllClientes');
  }

  addNewCliente(cliente: Cliente) {
    return this.http.post<Cliente>(this.URL_API + '/addCliente', cliente);
  }

  updateCliente(cliente: Cliente) {
    return this.http.put<Cliente>(this.URL_API + `/updateCliente/${cliente.idCliente}`, cliente);
  }

  deleteCliente(idCliente: any) {
    return this.http.delete(this.URL_API + `/deleteCliente/${idCliente}`);
  }

}
