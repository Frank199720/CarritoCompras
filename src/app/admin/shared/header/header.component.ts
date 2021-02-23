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
  datos=[];
  login:Boolean=false;
  ngOnInit(): void {
    let items = localStorage.getItem("arreglo")
    if(items){
      this.datos = JSON.parse(items);
      this.datos.forEach(element => {
        this.carrito.numeroVentas =  this.carrito.numeroVentas + element.pro_cantidad_elegida;
      });
      
    }else{
      this.carrito.numeroVentas=0;
    }
    
  }

}
