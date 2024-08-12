import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuarioModel';
import { UsuarioService } from '../services/usuario.service';
import { DepartamentoService } from '../services/departamento.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from '../models/departamentoModel';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/clienteModel';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  constructor(public UserService: UsuarioService, public DeptService: DepartamentoService, public modal: NgbModal, public ClientService: ClienteService,
    public LoaderService:LoaderService) { }

  cliente: any;
  usuario: any = [{
    idUsuario: '',
    nombre_usuario: '',
    usuario: '',
    password: '',
    email: '',
    departamento: [{
      nombre_departamento: ''
    }]
  }]

  //Filtros
  filterUser = '';

  //Paginador
  pageSize = 5;
  page = 1;

  ngOnInit() {
    this.getAllUsuarios();
    this.getAllDepartamentos();
    this.getAllClientes();
  }

  getAllDepartamentos() {
    this.DeptService.getDepartamentos().subscribe((res) => {
      this.DeptService.Dept = res as Departamento[];
    });
  }

  getAllClientes() {
    this.ClientService.getAllClientes().subscribe((res) => {
      this.cliente = res;      
    });
  }

  getAllUsuarios() {
    this.UserService.getAllUsuarios().subscribe((res) => {
      this.UserService.usuario = res as Usuario[];
      this.usuario = res;
    });
  }

  addUsuario(form: NgForm) {
    if (form.valid) {
      if (form.value.idUsuario) {
        this.UserService.updateUsuario(form.value).subscribe((res) => {
          this.getAllUsuarios();
          this.modal.dismissAll();
          this.resetForm(form);
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
          });

          Toast.fire({
            icon: 'success',
            title: 'Actualizado'
          });
        });
      } else {
        this.UserService.addUsuario(form.value).subscribe((res) => {
          this.getAllUsuarios();
          this.modal.dismissAll();
          this.resetForm(form);
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
          });

          Toast.fire({
            icon: 'success',
            title: 'Registrado'
          });
        });
      }
    }
  }

  updateUsuario(usuario: Usuario) {
    this.UserService.selectedUsuario = usuario;
  }

  deleteUsuario(idUsuario: any) {
    Swal.fire({
      title: '¿Estás seguro de querer eliminarlo?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserService.deleteUsuario(idUsuario).subscribe(() => {
          this.getAllUsuarios();
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
  }

  //ResetForm
  resetForm(form: NgForm) {
    if (form) {
      form.reset();
    }
  }

}
