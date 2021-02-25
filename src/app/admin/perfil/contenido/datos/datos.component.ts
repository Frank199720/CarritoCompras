import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Department } from '../../../../interfaces/department';
import { Provincia } from '../../../../interfaces/provincia';
import { Distrito } from '../../../../interfaces/distrito';
import { UsuarioService } from '../../../../services/usuario.service';
import { UbicacionService } from '../../../../services/ubicacion.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/user';
import Swal from 'sweetalert2';

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
  usuario:User = {
    usu_dni: this.authService.user.usu_dni,
    usu_email: this.authService.user.usu_email,
    usu_password: this.authService.user.usu_password,
    usu_apellidos: this.authService.user.usu_apellidos,
    usu_nombres: this.authService.user.usu_nombres,
    usu_telefono: this.authService.user.usu_telefono,
    usu_celular: this.authService.user.usu_celular,
    usu_direccion: this.authService.user.usu_direccion,
    department_id: this.authService.user.department_id,
    province_id: this.authService.user.province_id,
    district_id: this.authService.user.district_id,
  };

  departamentos:Department[];
  provincias:Provincia[];
  distritos:Distrito[];

  constructor(private usuarioService:UsuarioService, private authService:AuthService, private ubicacion:UbicacionService) { 
    ubicacion.getDepartamentos().subscribe((data:Department[])=>{
      this.departamentos = data;
    });
    ubicacion.getProvincias(this.usuario.department_id).subscribe((data:Provincia[])=>{
      this.provincias = data;
    });
    ubicacion.getDistritos(this.usuario.province_id).subscribe((data:Distrito[])=>{
      this.distritos = data;
    });
  }

  ngOnInit(): void {
  }

  actualizar(){
    this.usuarioService.update(this.usuario, this.usuario.usu_dni).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Datos actualizados',
        showConfirmButton: false,
        timer: 1500,
      });
      this.deshabilitar();
      this.editar=false;
    },error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Intetelo mas tarde!',
        showConfirmButton: false,
        timer: 1500,
      });
      this.cancelar();
    });
  }

  cancelar(){
    this.deshabilitar();
    this.editar = false;
    this.usuario = {
      usu_dni: this.authService.user.usu_dni,
      usu_email: this.authService.user.usu_email,
      usu_password: this.authService.user.usu_password,
      usu_apellidos: this.authService.user.usu_apellidos,
      usu_nombres: this.authService.user.usu_nombres,
      usu_telefono: this.authService.user.usu_telefono,
      usu_celular: this.authService.user.usu_celular,
      usu_direccion: this.authService.user.usu_direccion,
      department_id: this.authService.user.department_id,
      province_id: this.authService.user.province_id,
      district_id: this.authService.user.district_id,
    };
    this.ubicacion.getProvincias(this.usuario.department_id).subscribe((data:Provincia[])=>{
      this.provincias = data;
    });
    this.ubicacion.getDistritos(this.usuario.province_id).subscribe((data:Distrito[])=>{
      this.distritos = data;
    });
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

  selectDep(departamento){
    this.ubicacion.getProvincias(departamento.value).subscribe((data:Provincia[])=>{
      this.provincias = data;
    });
  }

  selectProv(provincia){
    this.ubicacion.getDistritos(provincia.value).subscribe((data:Distrito[])=>{
      this.distritos = data;
    });
  }
}
