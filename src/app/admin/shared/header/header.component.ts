import { Component, OnInit } from '@angular/core';
import { Prueba } from 'src/app/interfaces/prueba';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(public carrito:CarService) { }
  datos:Prueba[];
  ngOnInit(): void {
    let items = localStorage.getItem("arreglo")
    this.datos = JSON.parse(items);
    this.carrito.numeroVentas=this.datos.length;
  }

}
