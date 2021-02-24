import { Injectable } from '@angular/core';
import { Prueba } from '../interfaces/prueba';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  numeroVentas:number=0;
  data=[];
  totalVenta:number=0;
  constructor() { }
  addCarrito(){
    let items = localStorage.getItem("arreglo")
    this.data = JSON.parse(items);
    
  }
  actualizarVenta(){
  
    let array = JSON.parse(localStorage.getItem('arreglo'));
    if(array){
      this.totalVenta=0;
      array.forEach(element => {
        this.totalVenta+=element.pro_precio*element.pro_cantidad_elegida;
      });
    }
    
    
  }
}
