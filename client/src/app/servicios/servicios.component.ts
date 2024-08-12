import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosService } from '../services/servicios.service';
import Swal from 'sweetalert2';
import { Servicios } from '../models/serviciosModel';
import { NgForm } from '@angular/forms';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  constructor(public ServicioService: ServiciosService, public modal: NgbModal, public LoaderService:LoaderService) { }

  //Filtros
  filterServicio = '';
  pageSize = 5;
  page = 1;
  minPrice = 0;
  maxPrice = 0;

  ngOnInit() {
    this.getAllServicios();
  }

  addNewServicio(form: NgForm) {
    if (form.valid) {
      if (form.value.idServicio) {
        this.ServicioService.updateServicio(form.value).subscribe(() => {
          this.getAllServicios();
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
          });

          Toast.fire({
            icon: 'success',
            title: 'Actualizado'
          })
        });
      } else {
        this.ServicioService.addNewServicio(form.value).subscribe(() => {
          this.getAllServicios();
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
          })
        });
      }
    }
  }

  getAllServicios() {
    this.ServicioService.getAllServicios().subscribe((res) => {
      this.ServicioService.servicio = res as Servicios[];
    });
  }

  deleteServicio(idServicio: any) {
    Swal.fire({
      title: '¿Estás seguro de querer eliminarlo?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServicioService.deleteServicio(idServicio).subscribe(() => {
          this.getAllServicios();
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

  updateServicio(servicio: Servicios) {
    this.ServicioService.selectedServicio = servicio;
  }

  //ResetForm
  resetForm(form: NgForm) {
    if (form) {
      form.reset();
    }
  }

  //Filtros
  resetFiltros() {
    this.minPrice = 0;
    this.maxPrice = 0;
    this.getAllServicios();
  }

  filtrarPorRangoDePrecio(value: any) {
    let minPrice = value.minPrice;
    let maxPrice = value.maxPrice;

    this.ServicioService.servicio = this.ServicioService.servicio.filter(servicio => {
      return servicio.costo_servicio >= minPrice && servicio.costo_servicio <= maxPrice;
    });
  }

}