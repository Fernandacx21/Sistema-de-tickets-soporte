import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Cliente } from '../models/clienteModel';
import { Contrato } from '../models/contratoModel';
import { ClienteService } from '../services/cliente.service';
import { ContratoService } from '../services/contrato.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss']
})
export class ContratosComponent implements OnInit {

  file!: File;
  documentSelected: any;

  documentoList: any = [{
    nombre_documento: '',
    tipo_contrato: '',
    fecha_termino: '',
    cliente: {
      idCliente: '',
      nombre_cliente: '',
    }
  }];

  //filtros
  pageSize = 5;
  page = 1;
  filterContrato = '';
  filterClient = '';
  filterTipo = '';
  dateInit = '';
  dateFinish = '';

  constructor(public LoaderService:LoaderService, public modal:NgbModal, public ContratoService:ContratoService,
    public ClienteService:ClienteService  ) { }

  ngOnInit(): void {
    this.getAllClientes();
    this.getAllContratos();
  }

    //Funciones filtros
    resetFiltros() {
      this.getAllContratos();
      this.filterTipo = '';
      this.filterClient = '';
      this.dateInit = '';
      this.dateFinish = '';
    }

    dateFilter(value: any) {
      const dateInit = value.dateInit;
      const dateFinish = value.dateFinish;
  
      this.documentoList = this.documentoList.filter((data: any) => data.fecha_termino>= dateInit && data.fecha_termino <= dateFinish);
    }
  

  //Funciones para el documento
  onDocumentoSelected(event: any): void {
    if(event.target.files && event.target.files) {
      this.file = <File>event.target.files[0];
      //PDF preview
      const reader = new FileReader();
      reader.onload = e => {
        this.documentSelected = reader.result;
        reader.readAsDataURL(this.file);
      }
    }
  }

  createDocumento(form: NgForm, documento: File) {
    const fd = new FormData();
    fd.append('nombre_documento', form.value.nombre_documento);
    fd.append('tipo_contrato', form.value.tipo_contrato);
    fd.append('fecha_termino', form.value.fecha_termino);
    fd.append('clienteIdCliente', form.value.clienteIdCliente);
    fd.append('documento', documento);
    return fd;
  }
    
  createContrato(form: NgForm) {
    if(form.valid) {
      this.ContratoService.createContrato(this.createDocumento(form, this.file)).subscribe(() => {
        this.getAllContratos();
        this.modal.dismissAll();
        form.reset();
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
          title: 'Contrato Registrado'
        })
      });
    }
  }

  getAllContratos() {
    this.ContratoService.getAllContratos().subscribe(res => {
      this.ContratoService.contrato = res as Contrato[];
      this.documentoList = res;
    });
  }

  //Funciones para el cliente
  getAllClientes() {
    this.ClienteService.getAllClientes().subscribe((res) => {
      this.ClienteService.cliente = res as Cliente[];
    }
    );
  }
}
