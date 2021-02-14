import { Component, Input, OnInit } from '@angular/core';
import { Prueba } from 'src/app/interfaces/prueba';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-productoindi',
  templateUrl: './productoindi.component.html',
  styleUrls: ['./productoindi.component.css']
})
export class ProductoindiComponent implements OnInit {

  constructor(private carrito:CarService) { }
  @Input() prueba!:Prueba;
  ngOnInit(): void {
    
  }
  arreglo=[];
  addtoCar(){
    if(this.prueba.cantidad!=0){
      let array = localStorage.getItem("arreglo");
      if(array){
        this.arreglo = JSON.parse(array);
      }
      this.carrito.numeroVentas++;
      console.log(this.arreglo);
      this.arreglo.push(this.prueba);
      localStorage.setItem("arreglo",JSON.stringify(this.arreglo));
      this.carrito.addCarrito();
      console.log(this.prueba);
      console.log(this.prueba.cantidad);
    }
    
  }
}
