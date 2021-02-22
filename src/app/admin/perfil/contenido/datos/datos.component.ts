import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../../interfaces/usuario';

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

  usuario:Usuario = {
    usu_dni: '72382233',
  };
  usuarios:Usuario[];

  constructor() { }

  ngOnInit(): void {
  }

  actualizar(){
    console.log(this.usuario);
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
  }
}
