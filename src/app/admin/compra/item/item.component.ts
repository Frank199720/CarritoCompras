import { Component, OnInit, Input } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
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
    this.item.pro_cantidad_elegida++;
    console.log(this.item);
    if(this.item.pro_cantidad-this.item.pro_cantidad_elegida>this.item.pro_stock){
      
      this.carService.numeroVentas++;
      
      let productos = localStorage.getItem("arreglo");
      var array = JSON.parse(productos);
      let new_array =[];
      localStorage.removeItem('arreglo');
      array.forEach(element => {
        if(element.pro_id != this.item.pro_id){
          new_array.push(element);
        }else{
          new_array.push(this.item);
        }
      });
      
    
      localStorage.setItem('arreglo',JSON.stringify(new_array));
      this.carService.actualizarVenta();
      this.carService.addCarrito();
    }else{
      this.item.pro_cantidad_elegida--;
      this.showMessage('Error','Cantidad no permitida','error');
    }
   
   
    //localStorage.setItem("arreglo",JSON.stringify(array));
  }

  disminuir(){
    this.item.pro_cantidad_elegida--;
    console.log(this.item);
    if(this.item.pro_cantidad_elegida!=0){
      
      this.carService.numeroVentas--;
      
      let productos = localStorage.getItem("arreglo");
      var array = JSON.parse(productos);
      let new_array =[];
      localStorage.removeItem('arreglo');
      array.forEach(element => {
        if(element.pro_id != this.item.pro_id){
          new_array.push(element);
        }else{
          new_array.push(this.item);
        }
      });
      
    
      localStorage.setItem('arreglo',JSON.stringify(new_array));
      this.carService.actualizarVenta();
      this.carService.addCarrito();
    }else{
      this.removeItem();
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
  showMessage(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}
