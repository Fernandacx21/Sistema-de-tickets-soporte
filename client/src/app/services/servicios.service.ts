import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http';
import { Servicios } from '../models/serviciosModel';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private URL_API = 'http://localhost:8080/servicio';
  //private URL_API = '/servicio';
  servicio!: Servicios[]
  selectedServicio!: Servicios

  constructor(private http: HttpClient) {
    this.selectedServicio = new Servicios();
  }

  getAllServicios() {
    return this.http.get<Servicios[]>(this.URL_API + '/getAllServicios');
  }

  getOneServicio(idServicio: any) {
    return this.http.get<Servicios>(this.URL_API + `/getServicio/${idServicio}`);
  }

  addNewServicio(servicio: Servicios) {
    return this.http.post(this.URL_API + '/addServicio', servicio);
  }

  updateServicio(servicio: Servicios) {
    return this.http.put(this.URL_API + `/updateServicio/${servicio.idServicio}`, servicio);
  }

  deleteServicio(idServicio: any) {
    return this.http.delete(this.URL_API + `/deleteServicio/${idServicio}`);
  }

}
