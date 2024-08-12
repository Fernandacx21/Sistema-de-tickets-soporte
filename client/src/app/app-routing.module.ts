import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ContratosComponent } from './contratos/contratos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { SecureGuard } from './security/secure.guard';
import { ServiciosComponent } from './servicios/servicios.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketComponent } from './ticket/ticket.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  { path: 'cliente', component: ClienteComponent, canActivate: [SecureGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [SecureGuard] },
  { path: 'departamento', component: DepartamentoComponent, canActivate: [SecureGuard] },
  { path: 'ticket', component: TicketComponent, canActivate: [SecureGuard] },
  { path: 'contratos', component: ContratosComponent, canActivate: [SecureGuard] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [SecureGuard] },
  { path: 'servicios', component: ServiciosComponent, canActivate: [SecureGuard] },
  { path: 'ticket-detail/:id', component: TicketDetailComponent, canActivate: [SecureGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
