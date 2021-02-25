import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../../interfaces/usuario';
import { Departamento } from '../../../../interfaces/departamento';
import { Provincia } from '../../../../interfaces/provincia';
import { Distrito } from '../../../../interfaces/distrito';
import { UsuarioService } from '../../../../services/usuario.service';
import { UbicacionService } from '../../../../services/ubicacion.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  nombres = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  apellidos = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  dni = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  direccion = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  correo = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  departamento = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  provincia = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  distrito = new FormControl({ value: '', disabled: true }, [Validators.required]);

  editar:Boolean = false;
  usuario:User;;

  departamentos:Departamento[];

  constructor(private usuarioService:UsuarioService, private AuthService:AuthService, private ubicacion:UbicacionService) { 
    // usuarioService.login('alex@gmail.com','1234').subscribe((data:Usuario)=>{
    //   console.log(data);
    //   this.usuario = data[0];
    //   localStorage.setItem("usuario",JSON.stringify(this.usuario));
    //   console.log(this.usuario.usu_nombres);
    // });
    this.usuario=AuthService.user;
    ubicacion.getDepartamentos().subscribe((data:Departamento[])=>{
      this.departamentos = data;
    });
  }

  ngOnInit(): void {
  }

  actualizar(){
    console.log(this.usuario);
  }

  cancelar(){
    this.deshabilitar();
    this.editar = false;
    let user = localStorage.getItem("usuario");
    this.usuario = JSON.parse(user);
  }

  habilitar(){
    this.nombres.enable();
    this.apellidos.enable();
    this.dni.enable();
    this.direccion.enable();
    this.correo.enable();
    this.departamento.enable();
    this.provincia.enable();
    this.distrito.enable();
    this.editar = true;
  }

  deshabilitar(){
    this.nombres.disable();
    this.apellidos.disable();
    this.dni.disable();
    this.direccion.disable();
    this.correo.disable();
    this.departamento.disable();
    this.provincia.disable();
    this.distrito.disable();
  }
}
