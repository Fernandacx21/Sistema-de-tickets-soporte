import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarioModel';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);
import { KpiService } from '../services/kpi.service';
import { map } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ticketLength: any = '';
  ticketPendiente: any = '';
  ticketEnProceso: any = '';
  ticketResuelto: any = '';
  ticketCerrado: any = '';

  constructor(private KPIService: KpiService, public LoaderService:LoaderService) { }

  ngOnInit() {
    this.getTicketLength();
    this.getTicketPendiente();
    this.getTickeEnProceso();
    this.getTicketResuelto();
    this.getTicketCerrado();
    this.getTicketByTecnico();
    this.getTicketByDept();
    this.getTicketByCliente();
    this.getTareaByUsuario();
  }

  getTicketLength() {
    this.KPIService.getTicketLength().subscribe((res) => {
      this.ticketLength = res;
    });
  }
  getTicketPendiente() {
    this.KPIService.getTicketPendiente().subscribe((res) => {
      this.ticketPendiente = res;
    });
  }
  getTickeEnProceso() {
    this.KPIService.getTicketEnProceso().subscribe((res) => {
      this.ticketEnProceso = res;
    });
  }
  getTicketResuelto() {
    this.KPIService.getTicketResuelto().subscribe((res) => {
      this.ticketResuelto = res;
    });
  }
  getTicketCerrado() {
    this.KPIService.getTicketCerrado().subscribe((res) => {
      this.ticketCerrado = res;
    });
  }

  getTicketByTecnico() {
    this.KPIService.getTicketsByTecnico().subscribe((res) => {
      const resultUser: any = res;

      const filteredUser = resultUser.data.filter((data: any) => data.rol === 0);

      const TicketPorUsuario: any = filteredUser.map((usuario: any) => usuario.TicketPorUsuario);
      const nombreUsuario: any = filteredUser.map((usuario: any) => usuario.nombre_usuario);

      const ctx = document.getElementById('ChartTicket') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nombreUsuario,
          datasets: [{
            label: 'Tickets',
            data: TicketPorUsuario,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Tickets por Usuario'
            }
          }
        }
      });

    })
  }
  getTicketByDept() {
    this.KPIService.getTicketsByDept().subscribe((res) => {
      const resultDept: any = res;

      const filteredDept = resultDept.data.filter((data: any) => data.nombre_departamento !== 'Cliente')

      const ticketByDept: any = filteredDept.map((dept: any) => dept.TicketPorDept);
      const nombreDept: any = filteredDept.map((dept: any) => dept.nombre_departamento);
      const ctx = document.getElementById('ChartDept') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nombreDept,
          datasets: [{
            label: 'Departamento',
            data: ticketByDept,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Tickets por Departamento'
            }
          }
        }
      });
    });
  }
  getTicketByCliente() {
    this.KPIService.getTicketByCliente().subscribe((res) => {
      const resultClient: any = res;

      const filteredCliente = resultClient.data.filter((data: []) => data.length > 0);
      console.log(filteredCliente);
      

      const ticketByClient: any = resultClient.data.map((client: any) => client.TicketPorClient);
      const nombreClient: any = resultClient.data.map((client: any) => client.nombre_cliente);
      const ctx = document.getElementById('ChartClient') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: nombreClient,
          datasets: [{
            label: 'Cliente',
            data: ticketByClient,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Tickets por Cliente'
            }
          }
        }
      });
    });
  }
  getTareaByUsuario() {
    this.KPIService.getTareaByUsuario().subscribe((res) => {
      const resultUser: any = res;

      const filteredUser = resultUser.data.filter((data: any) => data.rol === 0)

      const taskByUser: any = filteredUser.map((user: any) => user.TaskByUser);
      const usuario: any = filteredUser.map((user: any) => user.usuario);
      const ctx = document.getElementById('ChartTaskUser') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: usuario,
          datasets: [{
            label: 'Tarea por Usuario',
            data: taskByUser,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Tareas por Usuario'
            }
          }
        }
      });
    });
  }

}
