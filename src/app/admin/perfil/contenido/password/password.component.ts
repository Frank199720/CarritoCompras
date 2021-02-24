import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
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

  usuario:Usuario;
  contrasenia;
  newContraseña:Usuario = {};

  newPassword = new FormControl('', [Validators.required]); 
  confirmPassword = new FormControl('', [Validators.required]);

  constructor(private usuarioService:UsuarioService) {  }

  ngOnInit(): void {
    let user = localStorage.getItem("usuario");
    this.usuario = JSON.parse(user);
    this.contrasenia = this.usuario.usu_password;
  }

  cambiarPassword(){
    //console.log(this.newPassword.invalid);
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
        //console.log(this.newContraseña);
        /*this.usuarioService.passwordUpdate(this.newPassword.value, this.usuario.usu_dni).subscribe(data=>{
          console.log(data);
        });*/
        this.usuarioService.passwordUpdate(this.newContraseña, this.usuario.usu_dni).subscribe(data=>{
          //console.log(data);
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
        /*this.usuarioService.passwordUpdate(this.newPassword.value, this.usuario.usu_dni).subscribe(data=>{
          console.log(this.newPassword.value);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Contraseña actualizada!',
            showConfirmButton: false,
            timer: 1500,
          });
        },error=>{
          console.log(error);
        });*/
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
    //console.log(this.newPassword.value);
  }

  cancelar(){
    this.change=false;
    this.newPassword.reset();
    this.confirmPassword.reset();
    this.hide1 = true;
    this.hide2 = true;
  }

}
