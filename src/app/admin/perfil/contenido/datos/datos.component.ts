import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  /*formPerfil: FormGroup;

  createFormGroup(){
    return new FormGroup({
      nombres: new FormControl({ value: '', disabled: true }, [Validators.required]),

    });
  }

  get nombres() { return this.formPerfil.get('nombres') }*/

  nombres = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  apellidos = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  dni = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  direccion = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  correo = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  departamento = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  provincia = new FormControl({ value: '', disabled: true }, [Validators.required]); 
  distrito = new FormControl({ value: '', disabled: true }, [Validators.required]); 

  constructor() { 
    //this.formPerfil=this.createFormGroup();
  }

  ngOnInit(): void {
  }

  habilitar(){
    //console.log(this.nombres.disabled);
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
