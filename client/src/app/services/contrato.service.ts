import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contrato } from '../models/contratoModel';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private URL_API = 'http://localhost:8080/documento';
  //private URL_API = '/documento';

  contrato!: Contrato[];
  selectedContrato!: Contrato;

  constructor(private http:HttpClient) {
    this.selectedContrato = new Contrato();
  }

  getAllContratos() {
    return this.http.get(this.URL_API + '/getAllDocumentos');
  }

  getOneContrato(contrato: Contrato) {
    return this.http.get(this.URL_API + `/getOneDocumento/${contrato.idDocumento}`);
  }

  createContrato(contrato: FormData) {
    return this.http.post(this.URL_API + '/addNewDocument', contrato);
  }

}
