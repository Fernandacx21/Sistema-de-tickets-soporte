import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotaPrivada } from '../models/notaPrivadaModel';
import { Ticket } from '../models/ticketModel';
import { Usuario } from '../models/usuarioModel';
import { NotaPrivadaService } from '../services/nota-privada.service';
import { TicketService } from '../services/ticket.service';
import { UsuarioService } from '../services/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DepartamentoService } from '../services/departamento.service';
import { Departamento } from '../models/departamentoModel';
import { NotaPublicaService } from '../services/nota-publica.service';
import { NotaPublica } from '../models/notaPublicaModel';
import { TareaService } from '../services/tarea.service';
import { Tarea } from '../models/tareaModel';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {

  auth: any = localStorage;

  TicketList: any = [{
    idTicket: '',
    asunto: '',
    descripcion_ticket: '',
    status: '',
    prioridad: '',
    sla: '',
    fecha_creación: '',
    fecha_vencimiento: '',
    user_ticket: '',
    hora_inicio: '',
    hora_termino: '',
    updatedAt: '',
    usuario: [{
      idUsuario: '',
      nombre_usuario: '',
      usuario: ''
    }],
    cliente: [{
      nombre_cliente: '',
      email_cliente: '',
      direccion_cliente: ''
    }],
    departamento: [{
      idDepartamento: '',
      nombre_departamento: ''
    }]
  }]

  NotaPrivadaList: any = [{
    idNotaPrivada: '',
    createdAt: '',
    usuario: [{
      nombre_usuario: '',
      usuario: ''
    }]
  }]

  NotaPublicaList: any = [{
    idNotaPublica: '',
    createdAt: '',
    usuario: [{
      nombre_usuario: '',
      usuario: ''
    }]
  }]

  TareaList: any = [{
    idTarea: '',
    asunto_tarea: '',
    descripcion_tarea: '',
    status_tarea: '',
    generado_por: '',
    fecha_creacion: '',
    fecha_vencimiento: '',
    updateAt: '',
    usuario: {
      idUsuario: '',
      nombre_usuario: '',
      usuario: ''
    }
  }]

  //Variable para obtener el id del ticket oara agregar nota privada
  idTicketParam = this.ruta.snapshot.paramMap.get('id');

  constructor(private ruta: ActivatedRoute, public TicketService: TicketService, public PrivateNoteService: NotaPrivadaService,
    public UserService: UsuarioService, public modal: NgbModal, public DeptService: DepartamentoService,
    public PublicNoteService: NotaPublicaService, public TaskService: TareaService, public LoaderService:LoaderService) { }

  ngOnInit() {
    const id = this.ruta.snapshot.paramMap.get('id');
    this.getOneTicket(id);
    this.getAllNotasPrivadasByTicket(id);
    this.getAllNotasPublicasByTicket(id);
    this.getAllUsuarios();
    this.getAllDepartamentos();
    this.editTicket(this.TicketList);
    this.getAllTareasByTicket(id);
  }

  //Funciones notas privadas
  addNotaPrivada(form: NgForm) {
    if (form.valid) {
      this.PrivateNoteService.addPrivateNote(form.value).subscribe(() => {
        this.getAllNotasPrivadasByTicket(this.idTicketParam);
        this.getAllUsuarios();
        this.modal.dismissAll();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
  
        Toast.fire({
          icon: 'success',
          title: 'Nota Agregada'
        })
      });
    }
  }
  getAllNotasPrivadasByTicket(idTicket: any) {
    this.PrivateNoteService.getAllNotasPrivadasByTicket(idTicket).subscribe((res) => {
      this.PrivateNoteService.privateNote = res as NotaPrivada[];
      this.NotaPrivadaList = res;
    });
  }

  //Funciones notas publicas
  addNotaPublica(form: NgForm) {
    if (form.valid) {
      this.PublicNoteService.addNotaPublica(form.value).subscribe((res) => {
        this.getAllNotasPublicasByTicket(this.idTicketParam);
        this.getAllUsuarios();
        this.modal.dismissAll();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
  
        Toast.fire({
          icon: 'success',
          title: 'Nota Agregada'
        })
      });
    }
  }
  getAllNotasPublicasByTicket(idTicket: any) {
    this.PublicNoteService.getAllNotasPublicasByTicket(idTicket).subscribe((res) => {
      this.PublicNoteService.PublicNote = res as NotaPublica[];
      this.NotaPublicaList = res;
    });
  }

  //Funciones Tickets
  updateTicket(form: NgForm) {
    if (form.valid) {
      if (form.value.idTicket) {
        this.TicketService.updateTicket(form.value).subscribe((res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'success',
            title: 'Actualizado'
          })
        });
      }
    }
  }

  editTicket(ticket: Ticket) {
    this.TicketService.selectedTicket = ticket;
  }

  getOneTicket(idTicket: any) {
    this.TicketService.getOneTicket(idTicket).subscribe((res) => {
      this.TicketService.ticket = res as Ticket[];
      this.TicketList = res;
    });
  }

  //Funciones usuarios
  getAllUsuarios() {
    this.UserService.getAllUsuarios().subscribe((res) => {
      this.UserService.usuario = res as Usuario[];
    });
  }

  //Funciones departamentos
  getAllDepartamentos() {
    this.DeptService.getDepartamentos().subscribe((res) => {
      this.DeptService.Dept = res as Departamento[];
    });
  }

  //Funciones Tareas
  addNewTarea(form: NgForm) {
    if (form.valid) {
      if (form.value.idTarea) {
        this.TaskService.updateTarea(form.value).subscribe(() => {
          this.getAllTareasByTicket(this.idTicketParam);
          this.modal.dismissAll();
          this.reset()
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'success',
            title: 'Tarea Actualizada'
          })
        });
      } else {
        this.TaskService.addTarea(form.value).subscribe(() => {
          this.getAllTareasByTicket(this.idTicketParam);
          this.modal.dismissAll();
          this.reset()
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'success',
            title: 'Tarea Agregada'
          })
        });
      }
    }
  }
  getAllTareasByTicket(idTicket: any) {
    this.TaskService.getAllTareasByTicket(idTicket).subscribe((res) => {
      this.TaskService.tasks = res as Tarea[];
      this.TareaList = res;
    })
  }
  updateTarea(tarea: Tarea) {
    this.TaskService.selectedTarea = tarea;
  }
  openTareaModal(content: any) {
    this.modal.open(content, { size: 'xl', scrollable: true })
  }

  reset() {
    this.TaskService.selectedTarea.idTarea = 0
    this.TaskService.selectedTarea.asunto_tarea = '',
    this.TaskService.selectedTarea.descripcion_tarea = '',
    this.TaskService.selectedTarea.status_tarea = '',
    this.TareaList.usuario.idUsuario = ''
  }

}
