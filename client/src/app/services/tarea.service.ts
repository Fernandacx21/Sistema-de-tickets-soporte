import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../models/tareaModel';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private URL_API = 'http://localhost:8080/tarea';
  //private URL_API = '/tarea';
  selectedTarea!: Tarea;
  tasks!: Tarea[];

  constructor(private http: HttpClient) {
    this.selectedTarea = new Tarea();
   }

   addTarea(tarea: Tarea){
    return this.http.post<Tarea>(this.URL_API + '/addTarea', tarea);
   }

   getAllTareasByTicket(idTicket: any) {
    return this.http.get(this.URL_API + `/getAllTareasByTicket/${idTicket}`);
   }

   updateTarea(tarea: Tarea) {
    return this.http.put<Tarea>(this.URL_API + `/updateTarea/${tarea.idTarea}`, tarea);
   }

}
