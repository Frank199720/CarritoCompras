import { Component, Input, OnInit } from '@angular/core';
import { Prueba } from 'src/app/interfaces/prueba';
import { CarService } from 'src/app/services/car.service';
import { Producto } from '../../../interfaces/producto';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-productoindi',
  templateUrl: './productoindi.component.html',
  styleUrls: ['./productoindi.component.css']
})
export class ProductoindiComponent implements OnInit {

  constructor(private carrito:CarService) { }
  @Input()producto!:Producto;
  ngOnInit(): void {
    
  }
  arreglo=[];
  addtoCar(){
    if(this.producto.pro_cantidad-this.producto.pro_cantidad_elegida<=this.producto.pro_stock){
      this.showMessage('Error!','Cantidad no permitida','error');
    }
    if(this.producto.pro_cantidad_elegida!=0){
      let array = localStorage.getItem("arreglo");
      if(array){
        this.arreglo = JSON.parse(array);
      }
      this.carrito.numeroVentas++;
      console.log(this.arreglo);
      this.arreglo.push(this.producto);
      localStorage.setItem("arreglo",JSON.stringify(this.arreglo));
      this.carrito.addCarrito();
      console.log(this.producto);
      console.log(this.producto.pro_cantidad_elegida);
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
