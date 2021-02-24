import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  usuario:Usuario = {
    usu_dni: '72382233',
    usu_email: 'alex@gmail.com',
    usu_password: '123',
    usu_apellidos: 'Silvera',
    usu_nombres: 'Alexander',
    usu_telefono: '123456789',
    usu_celular: '044002325',
    usu_direccion: 'San aNDRES',
    usu_fech_reg: '2021-01-02',
  };

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }
  
  registrar(){
    console.log(this.usuario);
    localStorage.setItem("usuario",JSON.stringify(this.usuario));
    this.usuarioService.store(this.usuario).subscribe(data=>{
      console.log('exito')
    },error=>{
      console.log('Error')
    });
  }
}

