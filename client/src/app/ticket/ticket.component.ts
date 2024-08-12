import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { ClienteService } from '../services/cliente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ticket } from '../models/ticketModel';
import { DepartamentoService } from '../services/departamento.service';
import { UsuarioService } from '../services/usuario.service';
import { Departamento } from '../models/departamentoModel';
import { Cliente } from '../models/clienteModel';
import { Usuario } from '../models/usuarioModel';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { KpiService } from '../services/kpi.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiciosService } from '../services/servicios.service';
import { Servicios } from '../models/serviciosModel';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  auth: any = localStorage;

  Ticket: any = [{
    asunto: '',
    descripcion_ticket: '',
    status: '',
    prioridad: '',
    sla: '',
    fecha_creación: '',
    fecha_vencimiento: '',
    hora_inicio: '',
    hora_termino: '',
    updatedAt: '',
    usuario: [{
      nombre_usuario: '',
      usuario: ''
    }],
    cliente: [{
      nombre_cliente: '',
      email_cliente: '',
      direccion_cliente: ''
    }],
    departamento: [{
      nombre_departamento: ''
    }]
  }];

  UserList: any = {
    idUsuario: '',
    nombre_usuario: '',
    departamento: {
      idDepartamento: '',
      nombre_departamento: ''
    }
  };

  HoraTicket: any = {
    idTicket: '',
    hours: 0
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public TicketService: TicketService, public modal: NgbModal, public ClientService: ClienteService,
    public DeptService: DepartamentoService, public UserService: UsuarioService, private KPIService: KpiService, 
    public ServicioService: ServiciosService, public LoaderService:LoaderService) { }

  //Filtros
  filterStatus = '';
  filterPriority = '';
  filterTech = '';
  filterSearch = '';
  dateInit = '';
  dateFinish = '';
  pageSize = 5;
  page = 1;

  ngOnInit() {
    this.getAllTickets();
    this.getAllDepartamentos();
    this.getAllUsuarios();
    this.getAllClientes();
    this.getAllServicios();
  }

  //Modal
  OpenXLModal(content: any) {
    this.modal.open(content, { size: 'xl', scrollable: true })
  }

  getAllServicios() {
    this.ServicioService.getAllServicios().subscribe((res) => {
      this.ServicioService.servicio = res as Servicios[];
    });
  }

  //Funciones filtros
  resetFiltros() {
    this.getAllTickets();
    this.filterPriority = '';
    this.filterStatus = '';
    this.filterTech = '';
    this.dateInit = '';
    this.dateFinish = '';
  }

  dateFilter(value: any) {
    const dateInit = value.dateInit;
    const dateFinish = value.dateFinish;

    this.Ticket = this.Ticket.filter((data: any) => data.fecha_creacion >= dateInit && data.fecha_creacion <= dateFinish);
  }

  //Funciones tickets
  getAllTickets() {
    this.TicketService.getAllTickets().subscribe((res) => {
      this.TicketService.ticket = res as any;
      this.Ticket = res;
    });
  }

  getAllDepartamentos() {
    this.DeptService.getDepartamentos().subscribe((res) => {
      this.DeptService.Dept = res as Departamento[];
    });
  }

  getAllClientes() {
    this.ClientService.getAllClientes().subscribe((res) => {
      this.ClientService.cliente = res as Cliente[];
    });
  }

  addNewTicket(form: NgForm) {
    if (form.valid) {
      if (form.value.idTicket) {
        this.TicketService.updateTicket(form.value).subscribe((res) => {
          this.getAllTickets();
          this.getAllDepartamentos();
          this.getAllUsuarios();
          this.getAllClientes();
          this.resetForm();
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
            title: 'Actualizado'
          })
        });
      } else {
        this.TicketService.addNewTicket(form.value).subscribe((res) => {
          this.getAllTickets();
          this.getAllDepartamentos();
          this.getAllUsuarios();
          this.getAllClientes();
          this.resetForm();
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
            title: 'Registrado'
          })
        });
      }
    }
  }

  updateTicket(ticket: Ticket) {
    this.TicketService.selectedTicket = ticket;
    this.UserList = ticket;
  }

  deleteTicket(idTicket: any) {
    this.TicketService.deleteTicket(idTicket).subscribe((res) => {
      Swal.fire({
        title: '¿Estás seguro de querer eliminarlo?',
        icon: 'question',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.TicketService.deleteTicket(idTicket).subscribe(() => {
            this.getAllTickets();
            this.getAllDepartamentos();
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
              title: 'Eliminado'
            })
          });
        } else if (result.isDenied) {
          Swal.fire('Cambios no guardados');
        }
      });
    });
  }

  getHorasByTicket(idTicket: any) {
    this.KPIService.getHorasByTicket(idTicket).subscribe((res) => {
      this.HoraTicket = res;
    });
  }

  //Funciones usuarios
  getAllUsuarios() {
    this.UserService.getAllUsuarios().subscribe((res) => {
      this.UserService.usuario = res as Usuario[];
    });
  }

  getUsuario() {
    const id: any = this.TicketService.selectedTicket.usuarioIdUsuario

    this.UserService.getUsuario(id).subscribe((res) => {
      this.UserList = res;
    });
  }

  //ResetForm
  resetForm() {
    this.Ticket.asunto = '',
      this.Ticket.descripcion_ticket = '',
      this.Ticket.status = '',
      this.Ticket.prioridad = '',
      this.Ticket.sla = '',
      this.Ticket.fecha_creación = '',
      this.Ticket.fecha_vencimiento = '',
      this.Ticket.hora_inicio = '',
      this.Ticket.hora_termino = '',
      this.Ticket.updatedAt = ''
  }

  reset() {
    this.HoraTicket.idTicket = 0,
      this.HoraTicket.hours = 0
  }

}

