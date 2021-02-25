import { Component, OnInit } from '@angular/core';
import { Prueba } from 'src/app/interfaces/prueba';
import { CarService } from 'src/app/services/car.service';
import { Departamento } from '../../interfaces/departamento';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  departamentos:Departamento[];

  constructor(public carrito:CarService, private departamentoService:DepartamentoService) { 
    departamentoService.index().subscribe((data:Departamento[])=>{
      this.departamentos = data;
    });
  }
  
  ngOnInit(): void {
    // console.log(this.carrito.data);
  }

  // datos:Prueba[];

  // arreglo = [{
  //   nombre: "Maggie",
  //   tipo: "Perro",
  //   edad: 3,
  // }, {
  //   nombre: "Guayaba",
  //   tipo: "Perro",
  //   edad: 1,
  // }, {
  //   nombre: "Snowball",
  //   tipo: "Gato",
  //   edad: 1,
  // },
  // ];

  // elemento = {
  //   nombre: "Snowball",
  //   tipo: "Gato",
  //   edad: 1,
  // };

  // agregar(){
  //   let array = localStorage.getItem("arreglo");
  //   if(array){
  //     this.arreglo = JSON.parse(array);
  //   }
  //   this.arreglo.push(this.elemento);
  //   localStorage.setItem("arreglo",JSON.stringify(this.arreglo));
  //   console.log(this.arreglo);
  // }

}
