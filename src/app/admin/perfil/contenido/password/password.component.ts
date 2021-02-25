import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { AuthService } from '../../../../services/auth.service';
import { Usuario } from '../../../../interfaces/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  
  hide = true;
  hide1 = true;
  hide2 = true;
  change:boolean = false;

  dni;
  //password;
  newContraseña:Usuario = {};

  Password = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required]); 
  confirmPassword = new FormControl('', [Validators.required]);

  constructor(private usuarioService:UsuarioService, private authService:AuthService) {  }

  ngOnInit(): void { }

  /*cambiarPassword(){
    if (this.newPassword.invalid || this.confirmPassword.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Hay campos vacíos!',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      if (this.newPassword.value === this.confirmPassword.value) {
        this.newContraseña.usu_password = this.newPassword.value;
        this.usuarioService.passwordUpdate(this.newContraseña, this.usuario.usu_dni).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Contraseña actualizada!',
            showConfirmButton: false,
            timer: 1500,
          });
        },error=>{
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Intentelo mas tarde!',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Las contraseñas no coinciden!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }*/

  cambiarPassword(){
    if (this.newPassword.invalid || this.confirmPassword.invalid || this.Password.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Hay campos vacíos!',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      if (this.newPassword.value === this.confirmPassword.value) {
        this.newContraseña.usu_password = this.newPassword.value;
        this.dni = this.authService.user.usu_dni;
        this.usuarioService.passwordUpdate(this.newContraseña, this.dni, this.Password.value).subscribe(data=>{
          if(data === 50){
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'La contraseña original es inválida!',
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(data);
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Contraseña actualizada!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.cancelar();
          }
        },error=>{
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Intentelo mas tarde!',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Las contraseñas no coinciden!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  cancelar(){
    this.change=false;
    this.Password.reset();
    this.newPassword.reset();
    this.confirmPassword.reset();
    this.hide = true;
    this.hide1 = true;
    this.hide2 = true;
  }

}
