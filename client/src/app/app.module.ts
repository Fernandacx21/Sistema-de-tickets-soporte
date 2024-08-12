import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs'
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { TicketComponent } from './ticket/ticket.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarNavbarComponent } from './sidebar-navbar/sidebar-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthService } from './services/auth.service';
import { StatusPipe } from './pipes/status.pipe';
import { PrioridadPipe } from './pipes/prioridad.pipe';
import { TecnicoPipe } from './pipes/tecnico.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { ClientSearchPipe } from './pipes/client-search.pipe';
import { SearchDeptPipe } from './pipes/search-dept.pipe';
import { SearchUserPipe } from './pipes/search-user.pipe';
import { ContratosComponent } from './contratos/contratos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ServicioSearchPipe } from './pipes/servicio-search.pipe';
import { InterceptorService } from './services/interceptor.service';
import { SearchContratoPipe } from './pipes/search-contrato.pipe';
import { FilterClientePipe } from './pipes/filter-cliente.pipe';
import { FilterTipoContratoPipe } from './pipes/filter-tipo-contrato.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    DepartamentoComponent,
    TicketComponent,
    UsuarioComponent,
    DashboardComponent,
    SidebarNavbarComponent,
    TicketDetailComponent,
    AuthComponent,
    StatusPipe,
    PrioridadPipe,
    TecnicoPipe,
    SearchPipe,
    ClientSearchPipe,
    SearchDeptPipe,
    SearchUserPipe,
    ContratosComponent,
    ServiciosComponent,
    ServicioSearchPipe,
    SearchContratoPipe,
    FilterClientePipe,
    FilterTipoContratoPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MatTabsModule,
    MatBadgeModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  providers: [
    AuthService,
    { provide: MatPaginatorIntl },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
