import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../models/departamentoModel';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private URL_API = "http://localhost:8080/departamento";
  //private URL_API = "/departamento";

  selectedDepartamento!: Departamento;
  Dept!: Departamento[];

  constructor(private http: HttpClient) { 
    this.selectedDepartamento = new Departamento();
  }

  getDepartamentos() {
    return this.http.get(this.URL_API + '/getAllDepartamentos');
  }

  addDepartamentos(dept: Departamento) {
    return this.http.post<Departamento>(this.URL_API + '/addDepartamento', dept);
  }

  updateDepartamento(dept: Departamento) {
    return this.http.put<any>(this.URL_API + `/updateDepartamento/${dept.idDepartamento}`, dept);
  }

  deleteDepartamento(idDepartamento: any) {
    return this.http.delete(this.URL_API + `/deleteDepartamento/${idDepartamento}`);
  }

}
