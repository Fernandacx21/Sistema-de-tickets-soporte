import { Component, OnInit } from '@angular/core';
import { Departamento } from '../models/departamentoModel';
import { DepartamentoService } from '../services/departamento.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  constructor(public DeptService: DepartamentoService, public modal: NgbModal, public LoaderService:LoaderService) { }

  //Filtros
  filterDept = '';

  //Paginador
  pageSize = 5;
  page = 1;

  ngOnInit() {
    this.getAllDepartamentos();
  }

  getAllDepartamentos() {
    this.DeptService.getDepartamentos().subscribe((res) => {
      this.DeptService.Dept = res as Departamento[];
    });
  }

  addDepartamentos(form: NgForm) {
    if (form.valid) {
      if (form.value.idDepartamento) {
        this.DeptService.updateDepartamento(form.value).subscribe((res) => {
          this.getAllDepartamentos();
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
        });
      } else {
        this.DeptService.addDepartamentos(form.value).subscribe((res) => {
          this.getAllDepartamentos();
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
            title: 'Registrado'
          })
        });
      }
    }
  }

  updateDepartamento(departamento: Departamento) {
    this.DeptService.selectedDepartamento = departamento;
  }

  deleteDepartamento(idDepartamento: any) {
    Swal.fire({
      title: '¿Estás seguro de querer eliminarlo?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.DeptService.deleteDepartamento(idDepartamento).subscribe(() => {
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
  }

  //ResetForm
  resetForm(form: NgForm) {
    if(form) {
      form.reset();
    }
  }

}
