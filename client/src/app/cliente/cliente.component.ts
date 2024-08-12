import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/clienteModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  constructor(public ClientService: ClienteService, public modal: NgbModal, public LoaderService:LoaderService) { }

  //Filtros
  filterCliente = '';
  pageSize = 5;
  page = 1;

  ngOnInit() {
    this.getAllClientes();
  }

  getAllClientes() {
    this.ClientService.getAllClientes().subscribe((res) => {
      this.ClientService.cliente = res as Cliente[]; 
    });
  }

  addNewCliente(form: NgForm){
    if (form.valid) {
      if(form.value.idCliente) {
        this.ClientService.updateCliente(form.value).subscribe(() => {
          this.getAllClientes();
          this.resetForm(form);
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
        })
      } else {
        this.ClientService.addNewCliente(form.value).subscribe(() => {
          this.getAllClientes();
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
          })
  
          Toast.fire({
            icon: 'success',
            title: 'Registrado'
          })
        });
      }
    }
  }

  updateCliente(cliente: Cliente) {
    this.ClientService.selectedCliente = cliente;
  }

  deleteCliente(idCliente: any) {
    Swal.fire({
      title: '¿Estás seguro de querer eliminarlo?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ClientService.deleteCliente(idCliente).subscribe(() => {
          this.getAllClientes();
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

  openXlModal(content: any) {
    this.modal.open(content, { size: 'xl', scrollable: true });
  }

  //ResetForm
  resetForm(form: NgForm) {
    if(form) {
      form.reset();
    }
  }

}
