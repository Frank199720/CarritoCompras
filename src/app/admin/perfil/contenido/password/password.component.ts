import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  usuario:Usuario={
    usu_password:'algodones'
  };
  newPassword = new FormControl('', [Validators.required]); 
  confirmPassword = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }

  cambiarPassword(){
    console.log(this.newPassword.invalid);
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
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Contraseña actualizada!',
          showConfirmButton: false,
          timer: 1500,
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
