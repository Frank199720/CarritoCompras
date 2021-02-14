import { Injectable } from '@angular/core';
import { Prueba } from '../interfaces/prueba';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  numeroVentas:number=0;
  data:Prueba[];
  constructor() { }
  addCarrito(){
    let items = localStorage.getItem("arreglo")
    this.data = JSON.parse(items);
    
  }
}
