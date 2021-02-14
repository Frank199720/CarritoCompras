import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor() { }

  compras=[];

  ngOnInit(): void {
    let items = localStorage.getItem("arreglo");
    this.compras = JSON.parse(items);
    console.log(this.compras);
  }

}
