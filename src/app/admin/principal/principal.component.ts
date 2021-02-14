import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [
  ]
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let items = localStorage.getItem("arreglo")
    this.datos = JSON.parse(items);
  }

  datos = [];

  arreglo = [{
    nombre: "Maggie",
    tipo: "Perro",
    edad: 3,
  }, {
    nombre: "Guayaba",
    tipo: "Perro",
    edad: 1,
  }, {
    nombre: "Snowball",
    tipo: "Gato",
    edad: 1,
  },
  ];

  elemento = {
    nombre: "Snowball",
    tipo: "Gato",
    edad: 1,
  };

  agregar(){
    let array = localStorage.getItem("arreglo");
    if(array){
      this.arreglo = JSON.parse(array);
    }
    this.arreglo.push(this.elemento);
    localStorage.setItem("arreglo",JSON.stringify(this.arreglo));
    console.log(this.arreglo);
  }

}
