import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SecureGuard implements CanActivate {
  
  constructor(private AuthServise: AuthService, private route: Router) {}

  canActivate(): boolean {
    if(this.AuthServise.Logueado()) {
      return true;
    } else {
      Swal.fire(
        'Algo Fallo!',
        'Debes Iniciar Sesión',
        'info'
      );
      this.route.navigateByUrl('/auth');
      return false;
    }
  }
  
}
