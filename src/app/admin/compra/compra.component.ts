import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  /*formDireccion: FormGroup;

  createFormGroup(){
    return new FormGroup({
      direccion: new FormControl('', [Validators.required]),
    });
  }

  get direccion() { return this.formDireccion.get("direccion") }*/

  prueba =[];
  delivery:Boolean=true;
  boleta:Boolean=true;

  direccion = new FormControl('',[Validators.required]);
  departamento = new FormControl('',[Validators.required]);
  provincia = new FormControl('',[Validators.required]);
  distrito = new FormControl('',[Validators.required]);
  telefonoFijo = new FormControl('',[Validators.required]);
  celular = new FormControl('',[Validators.required]);
  cantidad = new FormControl('',[Validators.required]);
  

  constructor() { 
    //this.formDireccion = this.createFormGroup();
  }

  ngOnInit(): void {
    let items = localStorage.getItem("arreglo");
    this.prueba = JSON.parse(items);
  }

  probar(){
    console.log("checked");
  }
}
