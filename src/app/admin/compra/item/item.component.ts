import { Component, OnInit, Input } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input()
  item;
  new_array = [];
  last_array= [];
  constructor(public carService:CarService, private router:Router) { }

  ngOnInit(): void {
  }

  aumentar(){
    let productos = localStorage.getItem("arreglo");
    var array = JSON.parse(productos);
    this.item.pro_cantidad_elegida++;
    console.log(this.item);    
    //localStorage.setItem("arreglo",JSON.stringify(array));
  }

  disminuir(){
    if(this.item != 1){
      this.item--;
    }
  }
  removeItem(){
    this.last_array=JSON.parse(localStorage.getItem('arreglo'));
    this.new_array=[];
    this.last_array.forEach(element => {
      if(element.pro_id!=this.item.pro_id){
        this.new_array.push(element);
      }else{
        this.carService.numeroVentas=this.carService.numeroVentas-element.pro_cantidad_elegida;
      }
      
    });
    localStorage.removeItem('arreglo');
    localStorage.setItem('arreglo',JSON.stringify(this.new_array));
    this.carService.addCarrito();
    this.carService.actualizarVenta();
    if(this.carService.data.length==0){
     
      this.router.navigateByUrl('/shop/principal');
    }
  }
}
