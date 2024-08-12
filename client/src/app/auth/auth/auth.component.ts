import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  usuario: any = localStorage;

  constructor(public AuthService: AuthService, public UserService: UsuarioService,
    private router: Router, public LoaderService:LoaderService) { }

  ngOnInit(): void {
  }

  authSingIn(form: NgForm) {
    if (form.valid) {
      this.AuthService.SingIn(form.value).subscribe((res: any) => {
        localStorage.setItem('ACCESS_TOKEN', JSON.stringify(res.accesstoken).replace(/['"]+/g, ''));
        localStorage.setItem('NOMBRE_USUARIO', JSON.stringify(res.usuario.nombre_usuario).replace(/['"]+/g, ''));
        localStorage.setItem('USUARIO', JSON.stringify(res.usuario.usuario).replace(/['"]+/g, ''));
        localStorage.setItem('ROL', JSON.stringify(res.usuario.rol).replace(/['"]+/g, ''));
        localStorage.setItem('EMAIL', JSON.stringify(res.usuario.email).replace(/['"]+/g, ''));
        localStorage.setItem('IDUSUARIO', JSON.stringify(res.usuario.idUsuario).replace(/['"]+/g, ''));
        this.router.navigate(['/dashboard']);

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
          title: `Bienvenido ${this.usuario.NOMBRE_USUARIO}`
        });

      }, err => {
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
          icon: 'error',
          title: 'Credenciales Incorrectas'
        });
      });
    } else {
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
        icon: 'error',
        title: 'Credenciales Incorrectas'
      });
    }

  }



}
