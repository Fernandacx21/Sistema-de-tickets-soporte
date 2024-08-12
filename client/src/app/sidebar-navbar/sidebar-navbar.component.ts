import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

export interface Notify {
  id: number,
  titulo: string,
  desc: string
}

const valueString: Notify[] = [
  { id: 1, titulo: 'Notificacion 1', desc: 'Descripcion 1' },
  { id: 2, titulo: 'Notificacion 2', desc: 'Descripcion 2' },
  { id: 3, titulo: 'Notificacion 3', desc: 'Descripcion 3' }
]

@Component({
  selector: 'app-sidebar-navbar',
  templateUrl: './sidebar-navbar.component.html',
  styleUrls: ['./sidebar-navbar.component.scss']
})
export class SidebarNavbarComponent implements OnInit {

  auth: any = localStorage;

  constructor(public AuthService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  authLogOut() {
    this.AuthService.LogOut().subscribe(() => {
      this.router.navigate(['/auth']);
      localStorage.clear();
    })
  }

}
